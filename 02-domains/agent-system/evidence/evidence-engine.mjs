export function createEvidence({ id, type, status='unknown', claim, source, confidence=0, verification=null, relatedTo=[] }) {
  if (!id || !type || !claim) throw new Error('Evidence requires id, type and claim');
  if (!['verified','supported','hypothesis','unknown','rejected'].includes(status)) throw new Error(`Invalid evidence status: ${status}`);
  if (confidence < 0 || confidence > 1) throw new Error('Evidence confidence must be between 0 and 1');
  return { id, type, status, claim, source: source ?? null, confidence, verification, relatedTo, recordedAt: new Date().toISOString() };
}

export function evidenceStrength(status) {
  return { unknown: 0, hypothesis: 1, supported: 2, verified: 3, rejected: -1 }[status] ?? -1;
}

export function meetsEvidence(requirement, records) {
  return records.some((record) => record.type === requirement.type && evidenceStrength(record.status) >= evidenceStrength(requirement.minimumStatus) && (!requirement.subject || record.relatedTo.includes(requirement.subject)));
}

export function evaluateEvidenceRequirements(requirements = [], records = []) {
  const results = requirements.map((requirement) => ({ requirement, met: meetsEvidence(requirement, records) }));
  return { valid: results.every((r) => r.met), results };
}
