export const AUTHORITY_RANK = Object.freeze({ forbidden: 0, autonomous: 1, 'approval-required': 2, 'human-only': 3 });

export function authorityAllows(granted, required) {
  if (!granted || !required) return false;
  if (required === 'forbidden') return false;
  return AUTHORITY_RANK[granted] >= AUTHORITY_RANK[required];
}

export function effectiveAuthority(agentAuthority, taskAuthority, actionAuthority) {
  const values = [agentAuthority, taskAuthority, actionAuthority].filter(Boolean);
  if (values.includes('forbidden')) return 'forbidden';
  return values.reduce((lowest, value) => AUTHORITY_RANK[value] < AUTHORITY_RANK[lowest] ? value : lowest, 'human-only');
}

export function authorizeAction({ agentAuthority, taskAuthority='autonomous', requiredAuthority='autonomous', action }) {
  const effective = effectiveAuthority(agentAuthority, taskAuthority, requiredAuthority);
  const allowed = authorityAllows(effective, requiredAuthority);
  return { allowed, effectiveAuthority: effective, requiredAuthority, action, reason: allowed ? 'authorized' : 'authority boundary exceeded' };
}
