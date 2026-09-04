/**
 * Resolution Project Engine
 * Digitalizes the uncertainty-resolution model from Video 2.
 * Numeric thresholds are implementation defaults, not universal laws.
 */

const DIMENSIONS = [
  'market',
  'product',
  'team',
  'technology',
  'economics',
  'distribution',
  'operations'
];

function score(value) {
  const numeric = Number(value ?? 0);
  return Math.max(0, Math.min(100, Number.isFinite(numeric) ? numeric : 0));
}

export function createResolutionState(input = {}) {
  const dimensions = Object.fromEntries(DIMENSIONS.map(key => [key, score(input[key])]));
  const values = Object.values(dimensions);
  const overall = Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2));
  const weakest = DIMENSIONS.reduce((current, key) => dimensions[key] < dimensions[current] ? key : current, DIMENSIONS[0]);
  const lowCount = values.filter(value => value < 35).length;
  const redrawRisk = overall < 35 || lowCount >= 3 ? 'high' : overall < 60 || lowCount >= 1 ? 'medium' : 'low';
  return {
    dimensions,
    overall,
    weakest,
    redrawRisk,
    status: input.status ?? 'active',
    horizonDays: Math.max(1, Number(input.horizonDays ?? 90)),
    evidence: input.evidence ?? [],
  };
}

export function classifyDepartment(name, opts = {}) {
  if (!name?.trim()) throw new Error('Department name is required');
  const methodKnown = Boolean(opts.methodKnown);
  const scalable = opts.scalable === undefined ? methodKnown : Boolean(opts.scalable);
  return {
    name: name.trim(),
    type: methodKnown && scalable ? 'sure-shot' : 'r-and-d',
    methodKnown,
    scalable,
    reason: methodKnown && scalable ? 'method-understood-and-scalable' : 'method-or-scalability-uncertain',
  };
}

export function buildTrial(input = {}) {
  if (!input.hypothesis?.trim()) throw new Error('Trial hypothesis is required');
  const timeboxDays = Math.max(1, Number(input.timeboxDays ?? 5));
  const costCeiling = Math.max(0, Number(input.costCeiling ?? 0));
  return {
    id: input.id ?? `trial-${Date.now()}`,
    hypothesis: input.hypothesis.trim(),
    department: input.department ?? 'unspecified',
    timeboxDays,
    costCeiling,
    successEvidence: input.successEvidence ?? ['observable evidence target'],
    exitRules: input.exitRules ?? ['continue if evidence supports hypothesis', 'iterate if evidence is unclear', 'stop if evidence contradicts hypothesis or ceiling is reached'],
    status: 'planned',
  };
}

export function capacityModel({ outputUnits = 0, unitsPerPerson = 0, durationMonths = 0, buffer = 0 } = {}) {
  const output = Math.max(0, Number(outputUnits));
  const perPerson = Math.max(0, Number(unitsPerPerson));
  const duration = Math.max(0, Number(durationMonths));
  const normalizedBuffer = Math.max(0, Number(buffer));
  if (perPerson <= 0 || duration <= 0) throw new Error('unitsPerPerson and durationMonths must be greater than zero');
  const basePeople = output / (perPerson * duration);
  const estimatedPeople = Math.ceil(basePeople * (1 + normalizedBuffer));
  return {
    formula: 'outputUnits / (unitsPerPerson × durationMonths) × (1 + buffer)',
    basePeople: Number(basePeople.toFixed(2)),
    estimatedPeople,
    buffer: normalizedBuffer,
  };
}

export function chooseDeliveryPath({ methodKnown = false, existingCapability = false, recurringMonths = 0, urgency = 'normal' } = {}) {
  const months = Math.max(0, Number(recurringMonths));
  let path;
  let rationale;
  if (!methodKnown) {
    if (existingCapability) {
      path = 'train-internal';
      rationale = 'uncertain method but internal capability can run bounded learning';
    } else {
      path = urgency === 'high' ? 'technology-or-outsource' : 'rent-or-outsource';
      rationale = 'uncertain method should remain reversible while learning';
    }
  } else if (months >= 6) {
    path = 'hire-permanent';
    rationale = 'known recurring need supports durable internal capacity';
  } else if (urgency === 'high') {
    path = 'technology-or-outsource';
    rationale = 'known but urgent need favors faster capacity';
  } else {
    path = 'existing-team-or-contractor';
    rationale = 'known non-recurring or limited need does not yet justify permanent depth';
  }
  return { path, rationale };
}

export function stageRecommendation(resolution = {}, evidence = {}) {
  const state = resolution.dimensions ? resolution : createResolutionState(resolution);
  const audiencePositiveRate = Number(evidence.audiencePositiveRate ?? 1);
  const conversion = Number(evidence.conversion ?? 1);
  let stage = 'gold-candidate';
  if (state.redrawRisk === 'high' || state.overall < 35) stage = 'alpha';
  else if (state.overall < 70 || audiencePositiveRate < 0.5 || conversion <= 0) stage = 'beta';
  return {
    stage,
    overall: state.overall,
    weakest: state.weakest,
    redrawRisk: state.redrawRisk,
    rationale: stage === 'alpha' ? 'shape remains materially uncertain; prioritize bounded learning and redraw' : stage === 'beta' ? 'shape is partially resolved; validate quality, conversion, and remaining uncertainty' : 'shape is sufficiently resolved to prepare for release gates and scale decisions',
  };
}
