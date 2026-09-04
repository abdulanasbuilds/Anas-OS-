import path from 'node:path';
import fs from 'node:fs/promises';
import { ROOT } from '../fs.mjs';
import { advise } from './advisor.mjs';

const CONTEXT = path.join(ROOT, '06-knowledge', 'personal', 'STRATEGIC_CONTEXT.md');

async function readOptional(file) {
  try { return await fs.readFile(file, 'utf8'); } catch (error) { if (error.code === 'ENOENT') return ''; throw error; }
}

export async function planDailyBriefing({ date = new Date().toISOString() } = {}) {
  const context = await readOptional(CONTEXT);
  return {
    type: 'daily-briefing',
    date,
    status: 'plan-only',
    sourcePolicy: 'Use dated, evidence-backed sources when a research adapter is available; never invent current events.',
    sections: [
      { id: 'priority-goals', purpose: 'What matters most today based on strategic context.' },
      { id: 'business', purpose: 'Revenue, customers, sales pipeline, costs, and material blockers.' },
      { id: 'intelligence', purpose: 'Recent developments, tools, and market signals with explicit dates and sources.' },
      { id: 'projects', purpose: 'Active projects, stalled work, next actions, and dependencies.' },
      { id: 'commitments', purpose: 'Promises and deadlines requiring attention.' },
      { id: 'anomalies', purpose: 'Unexpected changes, risks, or opportunities worth investigating.' }
    ],
    contextAvailable: Boolean(context.trim()),
    nextAction: advise({ question: 'What is the highest-leverage reversible action for today?', context: { facts: context ? ['Strategic context is available.'] : [], unknowns: ['Current live metrics and external events require configured evidence adapters.'] } })
  };
}

export async function planWeeklyReview({ week = new Date().toISOString().slice(0, 10) } = {}) {
  return {
    type: 'weekly-review',
    week,
    status: 'plan-only',
    sections: [
      'Revenue and cash movement',
      'Customer acquisition and conversion',
      'Project progress and stuck work',
      'Content performance and strongest/weakest patterns',
      'Research and competitive signals',
      'Costs, provider usage, and vendor dependencies',
      'Failures and lessons',
      'Experiments to continue, stop, or start',
      'Next-week commitments'
    ],
    rule: 'Metrics must be sourced from connected systems or supplied records; missing data stays explicitly unknown.'
  };
}
