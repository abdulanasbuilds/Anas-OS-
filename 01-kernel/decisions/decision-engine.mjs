export function createDecision({ id, context, objective, constraints = [], options, evidence = [], selectedOption, rationale, confidence = null, reversible = true, approval = 'autonomous', owner }) {
  if (!id || !context || !objective || !owner) throw new Error('id, context, objective and owner are required');
  if (!Array.isArray(options) || options.length < 1) throw new Error('At least one option is required');
  if (!options.some((option) => option.id === selectedOption)) throw new Error('selectedOption must match an option id');
  if (confidence !== null && (confidence < 0 || confidence > 1)) throw new Error('confidence must be between 0 and 1');
  return { id, context, objective, constraints, options, evidence, decision: { selectedOption, rationale, confidence, reversible }, approval, owner, status: 'proposed', createdAt: new Date().toISOString() };
}

export function supersedes(decision, previousDecisionId) {
  return { ...decision, supersedes: previousDecisionId };
}
