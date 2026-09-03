import { createExecutionPlan, executionBatches } from './orchestration.mjs';
import { scoreRisk, riskRequiresApproval } from './risk.mjs';
import { listSkills } from './skills.mjs';

const DEFAULT_AGENTS = {
  research: 'research',
  product: 'product',
  build: 'builder',
  code: 'builder',
  security: 'security',
  test: 'qa',
  release: 'release',
  growth: 'growth'
};

function chooseAgent(goal) {
  const text = goal.toLowerCase();
  for (const [term, agent] of Object.entries(DEFAULT_AGENTS)) if (text.includes(term)) return agent;
  return 'strategist';
}

export async function planGoal({ goal, context = {}, risk = { likelihood: 1, impact: 2, exposure: 1, detectability: 4 } }) {
  if (!goal?.trim()) throw new Error('Goal is required');
  const skills = await listSkills();
  const agentId = chooseAgent(goal);
  const riskResult = scoreRisk(risk);
  const tasks = [
    { id: 'frame', agentId: 'strategist', objective: 'Frame the goal, constraints, assumptions, and success criteria', dependsOn: [] },
    { id: 'execute', agentId, objective: goal.trim(), dependsOn: ['frame'] },
    { id: 'verify', agentId: 'qa', objective: 'Verify the outcome and record evidence', dependsOn: ['execute'] }
  ];
  const plan = createExecutionPlan(tasks);
  return {
    goal: goal.trim(), context,
    selectedSkillHints: skills.filter(skill => goal.toLowerCase().includes(skill.id.replace(/-/g, ' '))).map(skill => skill.id),
    risk: riskResult,
    approvalRequired: riskRequiresApproval(riskResult),
    humanGate: riskRequiresApproval(riskResult) ? 'required before consequential execution' : 'not automatically required',
    plan,
    batches: executionBatches(plan),
    loop: ['goal','context','skill','plan','authority','execute','verify','evidence','approve-when-required','outcome','learning','governed-improvement']
  };
}
