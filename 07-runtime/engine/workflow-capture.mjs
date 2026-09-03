import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

function splitLines(text) { return String(text ?? '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); }

export function captureWorkflow(text) {
  if (!text?.trim()) throw new Error('Workflow text is required');
  const source = splitLines(text);
  const find = (...terms) => source.find(line => terms.some(term => line.toLowerCase().startsWith(term)));
  const steps = source.filter(line => /^(\d+[.)]|step\s+)/i.test(line));
  const questions = [];
  if (!steps.length) questions.push('What are the ordered execution steps?');
  if (!find('trigger')) questions.push('What triggers this workflow?');
  if (!find('outcome', 'goal', 'result')) questions.push('What is the desired outcome?');
  return {
    status: 'proposal', source: text.trim(),
    trigger: find('trigger') ?? 'unknown', outcome: find('outcome', 'goal', 'result') ?? 'unknown',
    owner: find('owner', 'agent') ?? 'unknown', cadence: find('cadence', 'frequency') ?? 'unknown',
    steps, tools: source.filter(line => /\b(tool|uses|via)\b/i.test(line)),
    decisions: source.filter(line => /\b(if|when|decision|choose|approve)\b/i.test(line)),
    approvals: source.filter(line => /\b(approval|approve|human|sign[- ]off)\b/i.test(line)),
    evidence: source.filter(line => /\b(evidence|source|proof|verify)\b/i.test(line)),
    failureRecovery: source.filter(line => /\b(fail|failure|retry|recover|fallback|escalat)\b/i.test(line)),
    questions
  };
}

export async function writeWorkflowCapture(capture) {
  const slug = capture.outcome === 'unknown' ? `capture-${Date.now()}` : capture.outcome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const file = path.join(ROOT, '07-runtime', 'state', 'workflow-captures', `${slug || `capture-${Date.now()}`}.json`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(capture, null, 2)}\n`, 'utf8');
  return path.relative(ROOT, file);
}
