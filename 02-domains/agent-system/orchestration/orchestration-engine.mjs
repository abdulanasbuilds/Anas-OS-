export function validateExecutionPlan(plan) {
  const errors = [];
  if (!plan?.id) errors.push('plan.id is required');
  if (!Array.isArray(plan?.tasks) || plan.tasks.length === 0) errors.push('plan.tasks must contain at least one task');
  const ids = new Set();
  for (const task of plan?.tasks ?? []) {
    if (!task.id) errors.push('every task requires id');
    if (ids.has(task.id)) errors.push(`duplicate task id: ${task.id}`);
    ids.add(task.id);
    if (!task.agentId) errors.push(`task ${task.id} requires agentId`);
    if (!task.objective) errors.push(`task ${task.id} requires objective`);
    for (const dep of task.dependsOn ?? []) if (!plan.tasks.some((candidate) => candidate.id === dep)) errors.push(`task ${task.id} depends on unknown task ${dep}`);
  }
  if (hasCycle(plan?.tasks ?? [])) errors.push('execution plan contains a dependency cycle');
  return { valid: errors.length === 0, errors };
}

function hasCycle(tasks) {
  const state = new Map(tasks.map((t) => [t.id, 0]));
  const visit = (id) => {
    const current = state.get(id);
    if (current === 1) return true;
    if (current === 2) return false;
    state.set(id, 1);
    const task = tasks.find((t) => t.id === id);
    for (const dep of task?.dependsOn ?? []) if (visit(dep)) return true;
    state.set(id, 2);
    return false;
  };
  return tasks.some((task) => visit(task.id));
}

export function readyTasks(plan, completed = new Set()) {
  return plan.tasks.filter((task) => task.status !== 'completed' && (task.dependsOn ?? []).every((dep) => completed.has(dep)));
}

export function executionBatches(plan) {
  const completed = new Set();
  const batches = [];
  while (completed.size < plan.tasks.length) {
    const batch = readyTasks(plan, completed).filter((task) => !batches.flat().some((x) => x.id === task.id));
    if (!batch.length) throw new Error('No executable tasks remain; plan may contain a dependency cycle or blocked tasks');
    batches.push(batch);
    batch.forEach((task) => completed.add(task.id));
  }
  return batches;
}

export function createExecutionPlan(tasks, metadata = {}) {
  const plan = { id: metadata.id ?? `plan_${Date.now()}`, version: '1.0.0', createdAt: new Date().toISOString(), tasks, metadata };
  const result = validateExecutionPlan(plan);
  if (!result.valid) throw new Error(result.errors.join('; '));
  return plan;
}
