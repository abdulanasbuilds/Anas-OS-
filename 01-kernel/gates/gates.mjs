import fs from 'node:fs/promises';

const FIELD_ALIASES = Object.freeze({
  problem:['business.problem'], target_customer:['business.targetCustomer'], desired_outcome:['business.desiredOutcome'], market_hypothesis:['business.marketHypothesis'], customer_evidence:['evidence.items'], alternative_analysis:['business.alternativeAnalysis'], validation_result:['business.validationResult'], willingness_to_pay_or_justification:['business.willingnessToPay'], prd:['product.prd'], acceptance_criteria:['product.acceptanceCriteria'], ux_flows:['product.uxFlows'], scope:['product.scope'], non_functional_requirements:['product.nonFunctionalRequirements'], architecture:['engineering.architecture'], data_model:['engineering.dataModel'], security_model:['engineering.securityModel'], integration_plan:['engineering.integrationPlan'], risk_assessment:['risk'], typecheck:['verification.typecheck'], lint:['verification.lint'], build:['verification.build'], changed_files:['verification.changedFiles'], tests:['verification.tests'], security_checks:['verification.securityChecks'], acceptance_result:['verification.acceptanceResult'], known_issues:['verification.knownIssues'], release_plan:['release.plan'], rollback_plan:['release.rollbackPlan'], deployment_evidence:['release.deploymentEvidence'], monitoring:['operations.monitoring'], support_path:['operations.supportPath'], backup_status:['operations.backupStatus'], incident_path:['operations.incidentPath'], metrics:['metrics'], feedback:['feedback'], insights:['learning.insights'], next_action:['learning.nextAction'], lessons:['learning.lessons'], system_change_proposal_or_no_change:['learning.systemChangeProposal']
});

export async function loadGates(path = '01-kernel/policies/gate-registry.json') {
  const data = JSON.parse(await fs.readFile(path, 'utf8'));
  if (!Array.isArray(data.gates)) throw new Error('Gate registry must contain a gates array');
  return data.gates;
}

export function evidenceIndex(project) { return new Set((project.evidence?.items ?? []).filter((e) => e.status !== 'unverified').map((e) => e.type)); }
function hasEvidenceField(project, key) { return (FIELD_ALIASES[key] ?? [key]).some((path) => { const value = path.split('.').reduce((current, part) => current?.[part], project); return value != null && value !== '' && !(Array.isArray(value) && value.length === 0); }); }
export function evaluateGate(project, gate) {
  const index = evidenceIndex(project);
  const missing = gate.required.filter((item) => !index.has(item) && !hasEvidenceField(project, item));
  const policyBlocked = project.metadata?.securityBypass === true || project.metadata?.containsSecrets === true;
  const approvalRequired = gate.mode === 'approval' || project.metadata?.riskLevel === 'high' || project.metadata?.riskLevel === 'critical';
  let status = missing.length === 0 ? 'pass' : 'fail';
  if (policyBlocked) status = 'blocked';
  if (approvalRequired && !project.approval?.approved && status === 'pass') status = 'blocked';
  return { id:gate.id, name:gate.name, status, requiredEvidence:[...gate.required], presentEvidence:gate.required.filter((item)=>index.has(item)||hasEvidenceField(project,item)), missingEvidence:missing, approvalRequired, approvedBy:project.approval?.approvedBy ?? null, evaluatedAt:new Date().toISOString() };
}
export function evaluateAllGates(project, gates) { return gates.filter((gate)=>gate.from===project.stage||gate.to===project.stage).map((gate)=>evaluateGate(project,gate)); }
