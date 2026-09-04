/**
 * Flywheel Engine
 * Digitalizes Video 3's operating model: distribution attracts talent and customers;
 * talent and delivery create trusted outputs; profitable delivery funds R&D;
 * R&D improves capability; experiments feed new distribution and resolution signals.
 * Numeric thresholds are configurable defaults, not universal laws.
 */

const DEFAULTS = {
  trustWeight: 0.25,
  talentWeight: 0.25,
  distributionWeight: 0.2,
  economicsWeight: 0.15,
  experimentationWeight: 0.15,
};

const score = (value) => Math.max(0, Math.min(100, Number.isFinite(Number(value)) ? Number(value) : 0));

export function assessFlywheel(input = {}, weights = DEFAULTS) {
  const dimensions = {
    trust: score(input.trust),
    talent: score(input.talent),
    distribution: score(input.distribution),
    economics: score(input.economics),
    experimentation: score(input.experimentation),
  };
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + Number(value || 0), 0) || 1;
  const weighted = Object.entries(dimensions).reduce((sum, [key, value]) => {
    const weightKey = `${key}Weight`;
    return sum + value * (Number(weights[weightKey] ?? 0) / totalWeight);
  }, 0);
  const weakest = Object.entries(dimensions).sort((a, b) => a[1] - b[1])[0][0];
  return {
    score: Number(weighted.toFixed(2)),
    dimensions,
    weakest,
    nextFocus: weakest,
    notRevenueForecast: true,
  };
}

export function mapFlywheel(input = {}) {
  return {
    nodes: [
      'distribution',
      'talent',
      'customer-value',
      'cash-generation',
      'r-and-d',
      'capability',
      'better-output',
      'distribution',
    ],
    edges: [
      { from: 'distribution', to: 'talent', mechanism: 'attention and credibility attract capable people' },
      { from: 'distribution', to: 'customer-value', mechanism: 'trust and reach create qualified demand' },
      { from: 'talent', to: 'customer-value', mechanism: 'capable teams execute specialized work' },
      { from: 'customer-value', to: 'cash-generation', mechanism: 'customers fund the operating system' },
      { from: 'cash-generation', to: 'r-and-d', mechanism: 'surplus can finance bounded experimentation' },
      { from: 'r-and-d', to: 'capability', mechanism: 'experiments create reusable know-how and tools' },
      { from: 'capability', to: 'better-output', mechanism: 'systems improve speed, quality, and margin' },
      { from: 'better-output', to: 'distribution', mechanism: 'work itself becomes proof, content, and opportunity surface' },
    ],
    governance: 'kernel-authorized; no automatic reinvestment or external commitment',
  };
}

export function scoreTrust(input = {}) {
  const signals = [
    ['promiseKeeping', score(input.promiseKeeping)],
    ['transparency', score(input.transparency)],
    ['qualityConsistency', score(input.qualityConsistency)],
    ['customerOutcomes', score(input.customerOutcomes)],
    ['disclosureDiscipline', score(input.disclosureDiscipline)],
  ];
  const total = signals.reduce((sum, [, value]) => sum + value, 0);
  return {
    score: Number((total / signals.length).toFixed(2)),
    signals: Object.fromEntries(signals),
    caveat: 'trust is a proxy; do not present this score as a direct measurement of reputation',
  };
}

export function evaluateTalentSystem(input = {}) {
  const attraction = score(input.attraction);
  const retention = score(input.retention);
  const enablement = score(input.enablement);
  const ownership = score(input.ownership);
  const fearFreeCreativity = score(input.fearFreeCreativity);
  return {
    score: Number(((attraction + retention + enablement + ownership + fearFreeCreativity) / 5).toFixed(2)),
    dimensions: { attraction, retention, enablement, ownership, fearFreeCreativity },
    principles: [
      'treat exceptional talent as partners, not interchangeable resources',
      'remove avoidable walls between talent and outcomes',
      'share upside responsibly as the business becomes stronger',
      'protect creative work from fear-driven management',
    ],
  };
}

export function buildRAndDPortfolio(input = {}) {
  const trials = Array.isArray(input.trials) ? input.trials : [];
  const maxActive = Math.max(1, Number(input.maxActive ?? 3));
  const bounded = trials.slice(0, maxActive).map((trial, index) => ({
    id: trial.id ?? `rnd-${index + 1}`,
    hypothesis: trial.hypothesis ?? '',
    timeboxDays: Math.max(1, Number(trial.timeboxDays ?? 14)),
    costCeiling: Math.max(0, Number(trial.costCeiling ?? 0)),
    successEvidence: trial.successEvidence ?? [],
    status: 'bounded',
  }));
  return {
    maxActive,
    trials: bounded,
    droppedCount: Math.max(0, trials.length - bounded.length),
    rule: 'keep R&D reversible, timeboxed, evidence-driven, and small relative to known production work',
  };
}

export function compareExperimentLearning(input = {}) {
  const before = score(input.before);
  const after = score(input.after);
  const delta = Number((after - before).toFixed(2));
  return {
    before,
    after,
    delta,
    interpretation: delta > 0 ? 'positive signal' : delta < 0 ? 'negative signal' : 'no measurable change',
    evidence: input.evidence ?? 'unspecified',
    recommendation: input.recommendation ?? 'review with human owner before adopting as a standard',
  };
}
