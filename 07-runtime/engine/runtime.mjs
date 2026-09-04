import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from '../fs.mjs';
import { ExecutionEngine } from './execution-engine.mjs';
import { appendAuditEvent, createAuditEvent } from './audit.mjs';
import { authorizeAction } from './authority.mjs';
import { invokeProvider } from './providers.mjs';

const AGENTS = path.join(ROOT, '02-domains/agent-system/registry/agents.json');
const TOOLS = path.join(ROOT, '02-domains/agent-system/registry/tools.json');
const ADAPTERS = path.join(ROOT, '07-runtime/config/adapters.json');

async function read(file) { return JSON.parse(await fs.readFile(file, 'utf8')); }
function toMap(items) { return new Map(items.map(item => [item.id, item])); }

function safeRelative(target) {
  const absolute = path.resolve(ROOT, target);
  const relative = path.relative(ROOT, absolute);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Path escapes ANAS OS root');
  return absolute;
}

function wrapTool(def, run) { return { id: def.id, authority: def.authority, mutates: Boolean(def.mutates), run }; }

function shellCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: ROOT, shell: false, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => resolve({ code, stdout, stderr }));
  });
}

async function providerTool(def, input) {
  const operation = def.id === 'audio.transcribe' ? 'transcription' : 'structured-response';
  const family = def.id === 'audio.transcribe' ? 'transcription' : 'ai';
  const capability = def.id === 'audio.transcribe' ? 'audio-transcription' : 'structured-response';
  return invokeProvider({ family, capability, operation, input, allowNetwork: input?.allowNetwork !== false });
}

export async function loadRuntime() {
  const [agentRegistry, toolRegistry, adapters] = await Promise.all([read(AGENTS), read(TOOLS), read(ADAPTERS)]);
  const engine = new ExecutionEngine({ agents: new Map(), tools: new Map(), audit: event => appendAuditEvent(createAuditEvent({
    type: event.type, actorType: 'runtime', actorId: 'anas-runtime', objectType: 'execution', objectId: event.requestId, data: event
  })) });
  for (const def of agentRegistry.agents ?? []) engine.registerAgent({ id: def.id, authority: def.approvalLevel === 'human_only' ? 'human-only' : def.approvalLevel === 'approval_required' ? 'approval-required' : 'autonomous', ...def });
  for (const def of toolRegistry.tools ?? []) {
    if (def.id === 'filesystem.read') engine.registerTool(wrapTool(def, async ({ path: filePath }) => ({ path: filePath, content: await fs.readFile(safeRelative(filePath), 'utf8') })));
    else if (def.id === 'filesystem.write') engine.registerTool(wrapTool(def, async ({ path: filePath, content }) => {
      if (typeof content !== 'string') throw new Error('filesystem.write requires string content');
      const target = safeRelative(filePath); await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, content, 'utf8'); return { path: filePath, bytes: Buffer.byteLength(content, 'utf8') };
    }));
    else if (def.id === 'test.run') engine.registerTool(wrapTool(def, async () => shellCommand('npm', ['test'])));
    else if (def.id === 'git.inspect') engine.registerTool(wrapTool(def, async () => shellCommand('git', ['status', '--short', '--branch'])));
    else if (def.id === 'ai.respond' || def.id === 'audio.transcribe') engine.registerTool(wrapTool(def, async input => providerTool(def, input ?? {})));
    else engine.registerTool(wrapTool(def, async () => ({ status: 'not-configured', tool: def.id, configured: Boolean(adapters.adapters?.[def.id]?.enabled) })));
  }
  return { engine, agents: toMap(agentRegistry.agents ?? []), tools: toMap(toolRegistry.tools ?? []), adapters };
}

export async function executeGoal({ plan, runtime, context = {} } = {}) {
  if (!plan?.plan?.tasks) throw new Error('A planned goal is required');
  const activeRuntime = runtime ?? await loadRuntime();
  const results = [];
  const completed = new Set();
  for (const batch of plan.batches ?? []) {
    for (const task of batch) {
      const unmet = (task.dependsOn ?? []).filter(dep => !completed.has(dep));
      if (unmet.length) { results.push({ taskId: task.id, status: 'blocked', reason: 'dependency-not-completed', unmetDependencies: unmet }); continue; }
      const agent = activeRuntime.agents.get(task.agentId);
      if (!agent) throw new Error(`Unknown planned agent: ${task.agentId}`);
      const authority = agent.approvalLevel === 'human_only' ? 'human-only' : agent.approvalLevel === 'approval_required' ? 'approval-required' : 'autonomous';
      const request = activeRuntime.engine.buildRequest({ taskId: task.id, agentId: task.agentId, objective: task.objective, authority, context });
      const requiresApproval = authority !== 'autonomous' || plan.approvalRequired;
      if (requiresApproval) { results.push({ taskId: task.id, status: 'approval-required', reason: 'Consequential execution must be explicitly approved before a mutating or external action.' }); continue; }
      const toolId = task.toolId ?? (task.agentId === 'qa' ? 'test.run' : task.agentId === 'strategist' ? 'ai.respond' : 'git.inspect');
      const authorization = authorizeAction({ agentAuthority: authority, taskAuthority: authority, requiredAuthority: activeRuntime.tools.get(toolId)?.authority ?? 'autonomous', action: `goal:${task.id}` });
      if (!authorization.allowed) { results.push({ taskId: task.id, status: 'blocked', authorization }); continue; }
      const result = await activeRuntime.engine.invoke(request, toolId, { prompt: task.objective, context, allowNetwork: false });
      const providerNotConfigured = result?.status === 'not-configured';
      results.push({ taskId: task.id, status: providerNotConfigured ? 'not-configured' : 'completed', tool: toolId, result });
      if (!providerNotConfigured) completed.add(task.id);
    }
  }
  const hasBlocked = results.some(r => r.status === 'blocked');
  const awaitingApproval = results.some(r => r.status === 'approval-required');
  const notConfigured = results.some(r => r.status === 'not-configured');
  return { goal: plan.goal, completed: [...completed], results, status: hasBlocked ? 'blocked' : awaitingApproval ? 'awaiting-approval' : notConfigured ? 'not-configured' : 'completed' };
}
