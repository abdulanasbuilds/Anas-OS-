export function requestApproval({ id, action, requestedBy, requiredAuthority, reason, conditions=[] }) {
  if (requiredAuthority !== 'approval-required' && requiredAuthority !== 'human-only') throw new Error('Approval is only valid for approval-required or human-only actions');
  return { id, action, requestedBy, requiredAuthority, status:'pending', reason, conditions, requestedAt:new Date().toISOString() };
}

export function resolveApproval(request, { approved, reviewer, conditions=[] }) {
  if (!request || request.status !== 'pending') throw new Error('Only pending approval requests can be resolved');
  return { ...request, status: approved ? 'approved' : 'rejected', reviewer, conditions, decisionAt:new Date().toISOString() };
}

export function isApprovalValid(approval, now = new Date()) {
  if (!approval || approval.status !== 'approved') return false;
  return !approval.expiresAt || new Date(approval.expiresAt) > now;
}
