export function scoreDistribution(input = {}) {
  const qualifiedReach = Math.max(0, Number(input.qualifiedReach ?? 0));
  const repeatExposure = Math.max(0, Number(input.repeatExposure ?? 0));
  const activeAudience = Math.max(0, Number(input.activeAudience ?? 0));
  const channelCount = Math.max(0, Number(input.channelCount ?? 0));
  const qualifiedOpportunities = Math.max(0, Number(input.qualifiedOpportunities ?? 0));
  const weights = { qualifiedReach: 0.30, repeatExposure: 0.25, activeAudience: 0.20, channelCount: 0.10, qualifiedOpportunities: 0.15 };
  const scale = (value, cap) => Math.min(1, value / cap);
  const score = 100 * (weights.qualifiedReach * scale(qualifiedReach, 10000) + weights.repeatExposure * scale(repeatExposure, 20) + weights.activeAudience * scale(activeAudience, 5000) + weights.channelCount * scale(channelCount, 5) + weights.qualifiedOpportunities * scale(qualifiedOpportunities, 25));
  return { score: Number(score.toFixed(2)), metricType: 'surface-area-proxy', notRevenueForecast: true, components: { qualifiedReach, repeatExposure, activeAudience, channelCount, qualifiedOpportunities } };
}

export function evaluateContentAsset(asset = {}, result = {}) {
  const required = ['id','purpose','format','channel'];
  const missing = required.filter(key => !asset[key]);
  return { valid: missing.length === 0, missing, utilityOrEntertainment: asset.valueType ?? 'unspecified', observations: { views: Number(result.views ?? 0), watchTimeSeconds: Number(result.watchTimeSeconds ?? 0), shares: Number(result.shares ?? 0), saves: Number(result.saves ?? 0), qualifiedLeads: Number(result.qualifiedLeads ?? 0), conversions: Number(result.conversions ?? 0) }, evidenceQuality: result.evidenceSource ? 'source-backed' : 'execution-backed' };
}

export function buildDistributionExperiment(input = {}) {
  if (!input.hypothesis?.trim()) throw new Error('Experiment hypothesis is required');
  return { id: input.id ?? `dist-exp-${Date.now()}`, hypothesis: input.hypothesis.trim(), variable: input.variable ?? 'content-packaging', control: input.control ?? 'current-baseline', treatment: input.treatment ?? 'proposed-change', horizonDays: Math.max(1, Number(input.horizonDays ?? 14)), successMetrics: input.successMetrics ?? ['qualified-reach','repeat-exposure','qualified-inbound'], attribution: 'probabilistic; do not infer causality without supporting evidence', approval: 'follow ANAS OS authority policy before external publication or consequential action' };
}
