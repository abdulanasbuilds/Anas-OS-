import fs from 'node:fs/promises';

export async function loadGates(path = 'policies/gate-registry.json') {
  const raw = await fs.readFile(path, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data.gates)) throw new Error('Gate registry must contain a gates array');
  return data.gates;
}

export function evidenceIndex(project) {
  return new Set((project.evidence?.items ?? []).filter((e) => e.status !== 'unverified').map((e) => e.type));
}

export function evaluateGate(project, gate) {
  const index = evidenceIndex(project);
  const missing = gate.required.filter((item) => !index.has(item) && !hasProjectField(project, item));
  const policyBlocked = project.metadata?.securityBypass === true || project.metadata?.containsSecrets === true;
  const approvalRequired = gate.mode === 'approval' || project.metadata?.riskLevel === 'high' || project.metadata?.riskLevel === 'critical';

  let status = missing.length === 0 ? 'pass' : 'fail';
  if (policyBlocked) status = 'blocked';
  if (approvalRequired && !project.approval?.approved && status === 'pass') status = 'blocked';

  return {
    id: gate.id,
    name: gate.name,
    status,
    requiredEvidence: [...gate.required],
    presentEvidence: gate.required.filter((item) => index.has(item) || hasProjectField(project, item)),
    missingEvidence: missing,
    approvalRequired,
    approvedBy: project.approval?.approvedBy ?? null,
    evaluatedAt: new Date().toISOString()
  };
}

function hasProjectField(project, key) {
  const groups = [project, project.business, project.product, project.engineering, project.operations, project.release, project.metrics];
  return groups.some((group) => group && group[key] != null && group[key] !== '' && !(Array.isArray(group[key]) && group[key].length === 0));
}

export function evaluateAllGates(project, gates) {
  return gates.filter((gate) => gate.from === project.stage || gate.to === project.stage).map((gate) => evaluateGate(project, gate));
}
