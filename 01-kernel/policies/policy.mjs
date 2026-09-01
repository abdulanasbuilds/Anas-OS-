import fs from 'node:fs/promises';

export async function loadPolicies(path = '01-kernel/policies/policy-registry.json') {
  const raw = await fs.readFile(path, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data.policies)) throw new Error('Policy registry must contain a policies array');
  return data.policies;
}

export function findPolicy(policies, id) { return policies.find((policy) => policy.id === id) ?? null; }

export function violationsFor(project, policies) {
  const violations = [];
  const has = (key) => Object.prototype.hasOwnProperty.call(project, key) && project[key] != null;
  if (project.stage !== 'discover' && (!has('business') || !project.business?.problem || !project.business?.targetCustomer)) violations.push({ id: 'P001', reason: 'Problem and target customer are missing.' });
  if (project.evidence?.items?.some((item) => item.status === 'unverified' && item.type === 'release')) violations.push({ id: 'P003', reason: 'Release evidence contains unverified claims.' });
  if (project.metadata?.containsSecrets === true) violations.push({ id: 'P002', reason: 'Project metadata indicates secrets are present.' });
  if (project.metadata?.securityBypass === true) violations.push({ id: 'P004', reason: 'Security controls are being bypassed.' });
  return violations.map((violation) => ({ ...violation, policy: findPolicy(policies, violation.id) }));
}
