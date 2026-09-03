import { authorizeAction } from './authority.mjs';
import { randomUUID } from 'node:crypto';

export class ExecutionEngine {
  constructor({ agents, tools, audit = async () => {} } = {}) {
    this.agents = agents ?? new Map();
    this.tools = tools ?? new Map();
    this.audit = audit;
  }

  registerAgent(agent) { this.agents.set(agent.id, agent); }
  registerTool(tool) { this.tools.set(tool.id, tool); }

  buildRequest(input) {
    const agent = this.agents.get(input.agentId);
    if (!agent) throw new Error(`Unknown agent: ${input.agentId}`);
    return {
      id: input.id ?? `exec_${randomUUID()}`,
      taskId: input.taskId,
      agentId: input.agentId,
      objective: input.objective,
      authority: input.authority ?? agent.authority,
      context: structuredClone(input.context ?? {}),
      inputs: structuredClone(input.inputs ?? {}),
      constraints: [...(input.constraints ?? [])],
      requiredEvidence: [...(input.requiredEvidence ?? [])],
      budget: input.budget ?? { maxToolCalls: 20, maxCost: 0 }
    };
  }

  authorizeTool(request, toolId) {
    const tool = this.tools.get(toolId);
    if (!tool) throw new Error(`Unknown tool: ${toolId}`);
    return authorizeAction({
      agentAuthority: this.agents.get(request.agentId)?.authority,
      taskAuthority: request.authority,
      requiredAuthority: tool.authority ?? 'autonomous',
      action: `tool:${toolId}`
    });
  }

  async invoke(request, toolId, args = {}) {
    const authorization = this.authorizeTool(request, toolId);
    await this.audit({ type: 'execution.authorization', requestId: request.id, toolId, authorization, at: new Date().toISOString() });
    if (!authorization.allowed) throw new Error(`Tool invocation blocked: ${authorization.reason}`);
    const tool = this.tools.get(toolId);
    const started = Date.now();
    const result = await tool.run(args, { request });
    await this.audit({ type: 'execution.tool.completed', requestId: request.id, toolId, durationMs: Date.now() - started, at: new Date().toISOString() });
    return result;
  }
}
