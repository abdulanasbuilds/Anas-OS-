import test from 'node:test';
import assert from 'node:assert/strict';
import { listSkills } from '../../07-runtime/engine/skills.mjs';
import { proposeLearning, readLearnings, approveLearning } from '../../07-runtime/engine/memory.mjs';
import { captureWorkflow } from '../../07-runtime/engine/workflow-capture.mjs';
import { advise } from '../../07-runtime/engine/advisor.mjs';
import { analyzeChiefOfStaff } from '../../07-runtime/engine/chief-of-staff.mjs';
import { listSchedules, runSchedule } from '../../07-runtime/engine/scheduler.mjs';

test('built-in skills are discoverable', async () => {
  const skills = await listSkills();
  assert.ok(skills.length >= 6);
  assert.ok(skills.some(skill => skill.id === 'personal-advisor'));
});

test('workflow capture never invents missing fields', () => {
  const result = captureWorkflow('1. Research the market\n2. Compare options');
  assert.equal(result.trigger, 'unknown');
  assert.equal(result.outcome, 'unknown');
  assert.ok(result.questions.length >= 2);
});

test('advisor prefers the smallest reversible action by default', () => {
  const result = advise({ question: 'What should I do next?' });
  assert.equal(result.recommendation.name, 'smallest-reversible-next-step');
  assert.equal(result.authority, 'advisory-only');
});

test('chief of staff extracts commitments and blockers', () => {
  const result = analyzeChiefOfStaff("I'll send the proposal Friday\nBlocked waiting for pricing\nFollow up with client");
  assert.equal(result.commitments.length, 1);
  assert.equal(result.blockers.length, 1);
  assert.equal(result.followUps.length, 1);
});

test('scheduler defaults are disabled and unconfigured handlers do not execute', async () => {
  const schedules = await listSchedules();
  assert.ok(schedules.length >= 3);
  const result = await runSchedule('daily-briefing');
  assert.equal(result.status, 'disabled');
});

test('learning lifecycle is propose then explicit approve', async () => {
  const before = await readLearnings();
  const proposal = await proposeLearning({ text: `test learning ${Date.now()}` });
  assert.equal(proposal.status, 'proposed');
  const approved = await approveLearning(proposal.id);
  assert.equal(approved.status, 'approved');
  const after = await readLearnings();
  assert.ok(after.length >= before.length + 1);
});
