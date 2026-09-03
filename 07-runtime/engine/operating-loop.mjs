import { createExecutionPlan, executionBatches } from './orchestration.mjs';
import { scoreRisk, riskRequiresApproval } from './risk.mjs';
import { listSkills } from './skills.mjs';

const DEFAULT_AGENTS = {
  research: 'researcher',
  product: 'product',
  build: 'builder',
  code: 'builder',
  security: 'security',
  test: 'qa',
  release: 'release',
  growth: 'growth',
  workflow: 'strategist',
  automate: 'builder'
};

const SKILL_TERMS = [
  ['advisor', 'personal-advisor'],
  ['workflow', 'workflow-capture'],
  ['briefing', 'research-briefing'],
  ['research', 'research-briefing'],
  ['content', 'content-repurposing'],
  ['chief of staff', 'chief-of-staff'],
  ['improve', 'system-improvement'],
  ['harness', 'agent-harness-execution'],
  ['provider', 'provider-neutral-execution']
];

function chooseAgent(goal) {
  const text = goal.toLowerCase();
  for (const [term, agent] of Object.entries(DEFAULT_AGENTS)) if (text.includes(term)) return agent;
  return 'strategist';
}

function chooseSkillHints(goal, skills) {
  const text = goal.toLowerCase();
  const hints = SKILL_TERMS.filter(([term]) => text.includes(term)).map(([, id]) => id);
  const exact = skills.filter(skill => text.includes(skill.id.replace(/-/g, ' '))).map(skill => skill.id);
  return [...new Set([...hints, ...exact])];
}

export async function planGoal({ goal, context = {}, risk = { likelihood: 1, impact: 2, exposure: 1, detectability: 4 } }) {
  if (!goal?.trim()) throw new Error('Goal is required');
  const skills = await listSkills();
  const agentId = chooseAgent(goal);
  const riskResult = scoreRisk(risk);
  const approvalRequired = riskRequiresApproval(riskResult);
  const tasks = [
    { id: 'frame', agentId: 'strategist', objective: 'Frame the goal, constraints, assumptions, and success criteria', dependsOn: [], toolId: 'git.inspect', consequential: false },
    { id: 'execute', agentId, objective: goal.trim(), dependsOn: ['frame'], toolId: 'git.inspect', consequential: approvalRequired },
    { id: 'verify', agentId: 'qa', objective: 'Verify the outcome and record evidence', dependsOn: ['execute'], toolId: 'test.run', consequential: false }
  ];
  const plan = createExecutionPlan(tasks);
  return {
    goal: goal.trim(),
    context,
    selectedSkillHints: chooseSkillHints(goal, skills),
    risk: riskResult,
    approvalRequired,
    humanGate: approvalRequired ? 'required before consequential execution' : 'not automatically required',
    plan,
    batches: executionBatches(plan),
    loop: ['goal','context','skill','plan','authority','execute','verify','evidence','approve-when-required','outcome','learning','governed-improvement'],
    operatingPrinciples: ['provider-neutral','local-first where practical','human taste at consequential boundaries','no silent self-modification']
  };
}
