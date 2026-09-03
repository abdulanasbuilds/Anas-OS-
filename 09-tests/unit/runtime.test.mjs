import test from 'node:test';
import assert from 'node:assert/strict';
import { loadRuntime, executeGoal } from '../../07-runtime/engine/runtime.mjs';
import { planGoal } from '../../07-runtime/engine/operating-loop.mjs';
import { systemCheck } from '../../07-runtime/engine/system-check.mjs';

test('runtime loads canonical agents, tools, and adapter boundary', async () => {
  const runtime = await loadRuntime();
  assert.ok(runtime.agents.has('builder'));
  assert.ok(runtime.tools.has('test.run'));
  assert.equal(runtime.adapters.policy.credentialsNeverStoredInRepository, true);
});

test('goal execution enforces dependencies after an approval block', async () => {
  const plan = await planGoal({ goal: 'build a small testable prototype', risk: { likelihood: 1, impact: 1, exposure: 1, detectability: 5 } });
  const result = await executeGoal({ plan });
  assert.equal(result.results[0].status, 'approval-required');
  assert.equal(result.results[1].status, 'blocked');
  assert.deepEqual(result.results[1].unmetDependencies, ['frame']);
});

test('system self-check is healthy', async () => {
  const result = await systemCheck();
  assert.equal(result.healthy, true);
});
