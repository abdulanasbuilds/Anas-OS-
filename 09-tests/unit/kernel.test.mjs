import test from 'node:test';
import assert from 'node:assert/strict';
import { authorizeAction } from '../../07-runtime/engine/authority.mjs';
import { createEvidence, evaluateEvidenceRequirements } from '../../07-runtime/engine/evidence.mjs';
import { createExecutionPlan, executionBatches } from '../../07-runtime/engine/orchestration.mjs';
import { scoreRisk } from '../../07-runtime/engine/risk.mjs';
import { canTransition, STAGES } from '../../07-runtime/engine/lifecycle.mjs';

test('canonical lifecycle is ordered and cyclic through learning', () => {
  assert.equal(STAGES[0], 'discover');
  assert.equal(canTransition('discover','validate'), true);
  assert.equal(canTransition('discover','build'), false);
  assert.equal(canTransition('learn','discover'), true);
});

test('authority cannot be elevated by a task', () => {
  const result = authorizeAction({ agentAuthority:'autonomous', taskAuthority:'approval-required', requiredAuthority:'approval-required', action:'deploy' });
  assert.equal(result.allowed, false);
});

test('risk scoring is deterministic', () => assert.deepEqual(scoreRisk({likelihood:5,impact:5,exposure:3,detectability:5}), {score:375,level:'critical'}));

test('evidence requirements accept verified evidence', () => {
  const evidence=[createEvidence({id:'e1',type:'test',status:'verified',claim:'unit suite passes',confidence:1,verification:'node test'})];
  assert.equal(evaluateEvidenceRequirements([{type:'test',minimumStatus:'verified'}], evidence).valid, true);
});

test('orchestration builds dependency batches', () => {
  const plan=createExecutionPlan([
    {id:'research',agentId:'research',objective:'Research',dependsOn:[]},
    {id:'product',agentId:'product',objective:'Define product',dependsOn:['research']},
    {id:'security',agentId:'security',objective:'Review',dependsOn:['research']}
  ]);
  assert.deepEqual(executionBatches(plan).map(batch=>batch.map(task=>task.id)), [['research'],['product','security']]);
});
