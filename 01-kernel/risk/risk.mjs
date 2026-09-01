export function scoreRisk({ probability, impact }) {
  if (!Number.isInteger(probability) || probability < 1 || probability > 5) throw new Error('probability must be an integer from 1 to 5');
  if (!Number.isInteger(impact) || impact < 1 || impact > 5) throw new Error('impact must be an integer from 1 to 5');
  const score = probability * impact;
  const level = score >= 20 ? 'critical' : score >= 12 ? 'high' : score >= 6 ? 'medium' : 'low';
  return { probability, impact, score, level };
}

export function highestRisk(risks = []) {
  if (!risks.length) return null;
  return risks.reduce((highest, risk) => (risk.score ?? risk.probability * risk.impact) > (highest.score ?? highest.probability * highest.impact) ? risk : highest);
}
