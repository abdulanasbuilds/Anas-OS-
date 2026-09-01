import fs from 'node:fs/promises';

export async function loadJson(path) {
  return JSON.parse(await fs.readFile(path, 'utf8'));
}

export function validateProject(project) {
  const errors = [];
  const required = ['id', 'name', 'type', 'stage', 'business', 'product', 'engineering', 'evidence'];
  for (const key of required) {
    if (project?.[key] === undefined || project?.[key] === null) errors.push(`Missing required field: ${key}`);
  }

  const stages = ['discover', 'validate', 'define', 'build', 'verify', 'release', 'operate', 'measure', 'learn'];
  if (project?.stage && !stages.includes(project.stage)) errors.push(`Invalid stage: ${project.stage}`);
  if (project?.business) {
    if (!project.business.problem || project.business.problem.length < 10) errors.push('business.problem must be at least 10 characters.');
    if (!project.business.targetCustomer || project.business.targetCustomer.length < 3) errors.push('business.targetCustomer is required.');
    if (!project.business.desiredOutcome) errors.push('business.desiredOutcome is required.');
  }
  if (project?.evidence && !Array.isArray(project.evidence.items)) errors.push('evidence.items must be an array.');
  if (project?.metadata?.containsSecrets === true) errors.push('Policy violation: metadata.containsSecrets=true.');
  if (project?.metadata?.securityBypass === true) errors.push('Policy violation: metadata.securityBypass=true.');

  return { valid: errors.length === 0, errors };
}

export function validateRepositoryShape(treePaths) {
  const requiredPaths = [
    '00-constitution/CONSTITUTION.md',
    '00-constitution/rules.json',
    'policies/policy-registry.json',
    'policies/approval-matrix.json',
    'policies/gate-registry.json',
    'schemas/project.schema.json',
    'schemas/decision.schema.json',
    'schemas/risk.schema.json',
    'schemas/agent.schema.json',
    'schemas/gate.schema.json',
    'agents/registry.json',
    'workflows/project-lifecycle.json',
    'src/cli.mjs'
  ];
  const set = new Set(treePaths);
  return { valid: requiredPaths.every((p) => set.has(p)), missing: requiredPaths.filter((p) => !set.has(p)) };
}
