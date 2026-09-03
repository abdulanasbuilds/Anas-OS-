import test from 'node:test';
import assert from 'node:assert/strict';
import { loadRuntime, executeGoal } from '../../07-runtime/engine/runtime.mjs';
import { planGoal } from '../../07-runtime/engine/operating-loop.mjs';
import { systemCheck } from '../../07-runtime/engine/system-check.mjs';
import { listProviders, resolveProvider, invokeAI } from '../../07-runtime/engine/providers.mjs';

test('runtime loads canonical agents, tools, provider boundary, and adapter policy', async () => {
  const runtime = await loadRuntime();
  assert.ok(runtime.agents.has('builder'));
  assert.ok(runtime.tools.has('test.run'));
  assert.ok(runtime.tools.has('ai.respond'));
  assert.equal(runtime.adapters.policy.credentialsNeverStoredInRepository, true);
  assert.ok(Array.isArray(runtime.providers));
});

test('safe goal execution is not blocked merely because strategist has approval-required authority', async () => {
  const plan = await planGoal({ goal: 'inspect the repository', risk: { likelihood: 1, impact: 1, exposure: 1, detectability: 5 } });
  const result = await executeGoal({ plan });
  assert.equal(result.results[0].status, 'completed');
  assert.equal(result.results[1].status, 'completed');
  assert.equal(result.results[2].status, 'completed');
});

test('high-risk goals still gate consequential execution', async () => {
  const plan = await planGoal({ goal: 'deploy to production', risk: { likelihood: 5, impact: 5, exposure: 5, detectability: 1 } });
  const result = await executeGoal({ plan });
  assert.equal(result.results[0].status, 'completed');
  assert.equal(result.results[1].status, 'approval-required');
  assert.equal(result.results[2].status, 'blocked');
});

test('provider routing is opt-in and paid providers are excluded by default', async () => {
  const providers = await listProviders();
  assert.ok(providers.every(provider => provider.enabled === false));
  assert.equal(await resolveProvider('ai.chat'), null);
  const result = await invokeAI({ messages: [{ role: 'user', content: 'test' }] });
  assert.equal(result.status, 'not-configured');
});

test('system self-check is healthy', async () => {
  const result = await systemCheck();
  assert.equal(result.healthy, true);
});
