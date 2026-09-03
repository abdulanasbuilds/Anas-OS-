import crypto from 'node:crypto';

const IMMUTABLE_PREFIXES = [
  'constitution', 'authority', 'security', 'approval-policy', 'financial-controls', 'legal-controls'
];

function idFor(input) { return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex').slice(0, 12); }

export function proposeImprovement({ target, observedIssue, evidence = [], proposedChange, verification = [], rollback = null } = {}) {
  if (!target || !observedIssue || !proposedChange) throw new Error('target, observedIssue, and proposedChange are required');
  const normalized = String(target).toLowerCase();
  const protectedTarget = IMMUTABLE_PREFIXES.some(prefix => normalized.startsWith(prefix) || normalized.includes(`/${prefix}`));
  return {
    id: idFor({ target, observedIssue, proposedChange }),
    status: 'proposed',
    target,
    observedIssue,
    evidence,
    proposedChange,
    verification,
    rollback,
    requiresHumanApproval: protectedTarget || true,
    protectionReason: protectedTarget ? 'Protected governance artifact' : 'System evolution is proposal-first by policy',
    adoption: 'pending-human-review'
  };
}

export function canAdoptImprovement(proposal, { approved = false } = {}) {
  if (!proposal || proposal.status !== 'proposed') return { allowed: false, reason: 'invalid-proposal' };
  if (!approved) return { allowed: false, reason: 'human-approval-required' };
  return { allowed: true };
}
