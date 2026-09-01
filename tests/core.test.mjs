import test from 'node:test';
import assert from 'node:assert/strict';
import { canTransition, transition } from '../src/core/lifecycle.mjs';
import { scoreRisk } from '../src/core/risk.mjs';
import { validateProject } from '../src/core/validate.mjs';

const validProject = {
  id: 'demo-project', name: 'Demo Project', type: 'saas', stage: 'discover',
  business: { problem: 'A real problem with enough detail.', targetCustomer: 'Business owner', desiredOutcome: 'Save time' },
  product: {}, engineering: {}, evidence: { items: [] }
};

test('lifecycle only permits canonical transitions', () => {
  assert.equal(canTransition('discover', 'validate'), true);
  assert.equal(canTransition('discover', 'build'), false);
});

test('transition returns updated project state', () => {
  const next = transition(validProject, 'validate');
  assert.equal(next.stage, 'validate');
  assert.ok(next.updatedAt);
});

test('risk scoring classifies critical risk', () => {
  assert.deepEqual(scoreRisk({ probability: 5, impact: 5 }), { probability: 5, impact: 5, score: 25, level: 'critical' });
});

test('project validation rejects missing core business definition', () => {
  const invalid = { ...validProject, business: { problem: 'short' } };
  const result = validateProject(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.length > 0);
});
