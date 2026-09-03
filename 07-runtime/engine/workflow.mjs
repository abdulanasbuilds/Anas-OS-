export function createWorkflow(definition) {
  if (!definition?.id || !definition?.name) throw new Error('Workflow requires id and name');
  if (!Array.isArray(definition.steps) || definition.steps.length === 0) throw new Error('Workflow requires at least one step');
  return { version:'1.0.0', status:'ready', ...definition };
}

export async function runWorkflow(workflow, context, { handlers = {}, audit = async () => {} } = {}) {
  let state = 'running';
  const results = [];
  await audit({ type:'workflow.started', workflowId:workflow.id, at:new Date().toISOString() });
  try {
    for (const step of workflow.steps) {
      const handler = handlers[step.id] ?? handlers[step.type];
      if (typeof handler !== 'function') throw new Error(`No handler registered for workflow step ${step.id}`);
      const started = Date.now();
      const output = await handler({ step, context, results });
      results.push({ stepId:step.id, status:'completed', durationMs:Date.now()-started, output });
      await audit({ type:'workflow.step.completed', workflowId:workflow.id, stepId:step.id, at:new Date().toISOString() });
    }
    state = 'completed';
  } catch (error) {
    state = 'failed';
    results.push({ status:'failed', error:{ name:error.name, message:error.message } });
    await audit({ type:'workflow.failed', workflowId:workflow.id, error:error.message, at:new Date().toISOString() });
    throw Object.assign(new Error(`Workflow ${workflow.id} failed: ${error.message}`), { cause:error, results });
  } finally {
    await audit({ type:`workflow.${state}`, workflowId:workflow.id, at:new Date().toISOString() });
  }
  return { workflowId:workflow.id, status:state, results };
}
