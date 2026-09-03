export function scoreRisk({ likelihood=1, impact=1, exposure=1, detectability=1 }) {
  for (const [name, value] of Object.entries({ likelihood, impact, exposure, detectability })) {
    if (!Number.isFinite(value) || value < 1 || value > 5) throw new Error(`${name} must be 1..5`);
  }
  const score = likelihood * impact * exposure * detectability;
  const level = score >= 300 ? 'critical' : score >= 150 ? 'high' : score >= 60 ? 'medium' : 'low';
  return { score, level };
}

export function riskRequiresApproval(level) { return level === 'high' || level === 'critical'; }
