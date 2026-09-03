import { scoreRisk, riskRequiresApproval } from './risk.mjs';

export function advise({ question, context = {}, evidence = [], options = [] }) {
  if (!question?.trim()) throw new Error('Advisor question is required');
  const facts = Array.isArray(context.facts) ? context.facts : [];
  const assumptions = Array.isArray(context.assumptions) ? context.assumptions : [];
  const unknowns = Array.isArray(context.unknowns) ? context.unknowns : [];
  const candidates = options.length ? options : [{ name: 'smallest-reversible-next-step', reversible: true, cost: 'low', risk: 'unknown' }];
  const scored = candidates.map(option => ({ ...option, evidenceScore: option.evidenceBacked ? 2 : 0, reversibilityScore: option.reversible === false ? 0 : 1 }));
  scored.sort((a, b) => (b.evidenceScore + b.reversibilityScore) - (a.evidenceScore + a.reversibilityScore));
  const recommendation = scored[0];
  const confidence = evidence.length ? Math.min(1, 0.4 + evidence.length * 0.15) : 0.25;
  const riskInput = context.risk ?? { likelihood: 1, impact: 1, exposure: 1, detectability: 5 };
  const risk = scoreRisk(riskInput);
  return { decision: question.trim(), facts, assumptions, unknowns, evidenceCount: evidence.length, options: scored, risks: context.risks ?? [], recommendation, nextAction: recommendation?.name ?? 'gather-evidence', confidence, openQuestions: unknowns, authority: 'advisory-only', requiresApproval: Boolean(context.action && riskRequiresApproval(risk.level)), risk };
}
