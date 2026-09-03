import test from 'node:test';
import assert from 'node:assert/strict';
import { planGoal } from '../../07-runtime/engine/operating-loop.mjs';
import { systemCheck } from '../../07-runtime/engine/system-check.mjs';

test('goal planning produces governed execution loop', async () => {
  const result = await planGoal({ goal: 'research a new SaaS opportunity' });
  assert.equal(result.goal, 'research a new SaaS opportunity');
  assert.deepEqual(result.plan.tasks.map(t => t.id), ['frame', 'execute', 'verify']);
  assert.ok(result.loop.includes('authority'));
  assert.ok(result.loop.includes('learning'));
});

test('system check validates the runtime boundary', async () => {
  const result = await systemCheck();
  assert.equal(result.healthy, true, JSON.stringify(result, null, 2));
  for (const check of result.checks) assert.equal(check.ok, true, check.id);
});
