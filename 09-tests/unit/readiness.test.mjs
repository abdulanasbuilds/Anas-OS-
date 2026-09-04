import test from 'node:test';
import assert from 'node:assert/strict';
import { readinessCheck } from '../../07-runtime/engine/readiness.mjs';

test('readiness check validates the live repository contract', async () => {
  const result = await readinessCheck();
  assert.equal(typeof result.healthy, 'boolean');
  assert.equal(result.checks.length, 7);
  assert.equal(result.checks.find(check => check.id === 'security-boundary').ok, true);
  assert.equal(result.checks.find(check => check.id === 'digital-engine-coverage').ok, true);
});
