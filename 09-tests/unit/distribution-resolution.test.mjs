import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreDistribution, evaluateContentAsset, buildDistributionExperiment } from '../../07-runtime/engine/distribution.mjs';
import { createResolutionState, classifyDepartment, buildTrial, capacityModel, chooseDeliveryPath, stageRecommendation } from '../../07-runtime/engine/resolution.mjs';

test('distribution score is transparent and bounded', () => {
  const result = scoreDistribution({ qualifiedReach: 10000, repeatExposure: 20, activeAudience: 5000, channelCount: 5, qualifiedOpportunities: 25 });
  assert.equal(result.score, 100);
  assert.equal(result.notRevenueForecast, true);
});

test('content evaluation identifies missing metadata', () => {
  const result = evaluateContentAsset({ id: 'c1', purpose: 'teach', format: 'video' }, { views: 10 });
  assert.deepEqual(result.missing, ['channel']);
});

test('distribution experiments are explicit hypotheses', () => {
  const result = buildDistributionExperiment({ hypothesis: 'A clearer hook increases qualified reach' });
  assert.equal(result.variable, 'content-packaging');
  assert.equal(result.horizonDays, 14);
});

test('resolution state identifies the weakest dimension', () => {
  const state = createResolutionState({ market: 80, product: 70, team: 20, technology: 60, economics: 50, distribution: 40, operations: 30 });
  assert.equal(state.weakest, 'team');
  assert.equal(state.redrawRisk, 'medium');
});

test('department classification separates sure-shot from R&D', () => {
  assert.equal(classifyDepartment('backend', { methodKnown: true }).type, 'sure-shot');
  assert.equal(classifyDepartment('novel motion capture', { methodKnown: false }).type, 'r-and-d');
});

test('capacity model applies an explicit buffer', () => {
  const result = capacityModel({ outputUnits: 120, unitsPerPerson: 10, durationMonths: 12, buffer: 0.30 });
  assert.equal(result.basePeople, 1);
  assert.equal(result.estimatedPeople, 2);
});

test('uncertain methods favor reversible delivery paths', () => {
  assert.equal(chooseDeliveryPath({ methodKnown: false }).path, 'rent-or-outsource');
});

test('resolution stage remains alpha when uncertainty is high', () => {
  const result = stageRecommendation({ market: 20, product: 30, team: 20, technology: 40, economics: 30, distribution: 20, operations: 30 });
  assert.equal(result.stage, 'alpha');
});

test('trial is bounded', () => {
  const result = buildTrial({ hypothesis: 'Reduce build-feedback time', timeboxDays: 5, costCeiling: 100 });
  assert.equal(result.timeboxDays, 5);
  assert.equal(result.status, 'planned');
});
