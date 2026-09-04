import test from 'node:test';
import assert from 'node:assert/strict';
import { assessFlywheel, mapFlywheel, scoreTrust, evaluateTalentSystem, buildRAndDPortfolio, compareExperimentLearning } from '../../07-runtime/engine/flywheel.mjs';

test('flywheel score is bounded and exposes the weakest dimension', () => {
  const result = assessFlywheel({ trust: 80, talent: 70, distribution: 90, economics: 20, experimentation: 60 });
  assert.equal(result.weakest, 'economics');
  assert.equal(result.notRevenueForecast, true);
});

test('flywheel map contains the core economic and capability loop', () => {
  const result = mapFlywheel();
  assert.equal(result.edges.some((edge) => edge.from === 'cash-generation' && edge.to === 'r-and-d'), true);
  assert.equal(result.edges.some((edge) => edge.from === 'better-output' && edge.to === 'distribution'), true);
});

test('trust scoring remains a proxy', () => {
  const result = scoreTrust({ promiseKeeping: 100, transparency: 100, qualityConsistency: 80, customerOutcomes: 60, disclosureDiscipline: 60 });
  assert.equal(result.score, 80);
  assert.match(result.caveat, /proxy/);
});

test('talent system measures attraction retention enablement ownership and creativity', () => {
  const result = evaluateTalentSystem({ attraction: 100, retention: 90, enablement: 80, ownership: 70, fearFreeCreativity: 60 });
  assert.equal(result.score, 80);
  assert.equal(result.dimensions.ownership, 70);
});

test('r-and-d portfolio is bounded', () => {
  const result = buildRAndDPortfolio({ maxActive: 2, trials: [
    { hypothesis: 'A', timeboxDays: 5 },
    { hypothesis: 'B', timeboxDays: 7 },
    { hypothesis: 'C', timeboxDays: 9 },
  ] });
  assert.equal(result.trials.length, 2);
  assert.equal(result.droppedCount, 1);
});

test('experiment learning distinguishes positive negative and flat signals', () => {
  assert.equal(compareExperimentLearning({ before: 20, after: 30 }).interpretation, 'positive signal');
  assert.equal(compareExperimentLearning({ before: 30, after: 20 }).interpretation, 'negative signal');
  assert.equal(compareExperimentLearning({ before: 20, after: 20 }).interpretation, 'no measurable change');
});
