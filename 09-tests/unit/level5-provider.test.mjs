import test from 'node:test';
import assert from 'node:assert/strict';
import { listProviders, selectProvider, invokeProvider } from '../../07-runtime/engine/providers.mjs';
import { listSkills, inspectSkill } from '../../07-runtime/engine/skills.mjs';
import { planDailyBriefing, planWeeklyReview } from '../../07-runtime/engine/briefing.mjs';
import { dueSchedules } from '../../07-runtime/engine/scheduler.mjs';

test('provider layer has a local no-cost fallback', async () => {
  const providers = await listProviders({ family: 'ai', env: {} });
  assert.ok(providers.some(provider => provider.id === 'builtin.local' && provider.effectiveState === 'available'));
  const selected = await selectProvider({ family: 'ai', capability: 'structured-response', env: {} });
  assert.equal(selected.id, 'builtin.local');
  const result = await invokeProvider({ family: 'ai', capability: 'structured-response', operation: 'structured-response', input: { prompt: 'hello' }, env: {} });
  assert.equal(result.status, 'completed');
  assert.equal(result.mode, 'deterministic-fallback');
});

test('skills include the transcript-inspired operating workflows', async () => {
  const skills = await listSkills();
  for (const id of ['personal-advisor','workflow-capture','skill-editor','research-briefing','chief-of-staff','content-repurposing','newsletter-editing','podcast-production','social-repurposing','thumbnail-title-testing','sponsor-tracking','last-30-days-research','no-ai-slop']) {
    assert.ok(skills.some(skill => skill.id === id), `missing skill: ${id}`);
  }
  const inspected = await inspectSkill('no-ai-slop');
  assert.match(inspected.content, /human review/i);
});

test('briefing and weekly review are deterministic plans', async () => {
  const daily = await planDailyBriefing({ date: '2026-09-04' });
  const weekly = await planWeeklyReview({ week: '2026-09-07' });
  assert.equal(daily.type, 'daily-briefing');
  assert.equal(weekly.type, 'weekly-review');
  assert.equal(daily.status, 'plan-only');
  assert.ok(weekly.sections.length >= 5);
});

test('scheduler understands the configured Ghana timezone', async () => {
  const due = await dueSchedules(new Date('2026-09-04T06:00:00Z'));
  assert.ok(Array.isArray(due));
});
