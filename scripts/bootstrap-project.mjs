#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [id, name = id, type = 'saas'] = process.argv.slice(2);

if (!id || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(id)) {
  console.error('Usage: node scripts/bootstrap-project.mjs <kebab-case-id> [name] [type]');
  process.exit(1);
}

const target = path.resolve(root, 'projects', id);
await fs.mkdir(target, { recursive: true });
const templatePath = path.join(root, 'templates/project/project.manifest.json');
const template = JSON.parse(await fs.readFile(templatePath, 'utf8'));
template.id = id;
template.name = name;
template.type = type;
template.metadata.createdAt = new Date().toISOString();

await fs.writeFile(path.join(target, 'project.manifest.json'), JSON.stringify(template, null, 2) + '\n');

const files = {
  'opportunity-brief.md': '# Opportunity Brief\n\nDescribe the opportunity, customer, problem, alternatives, urgency, and initial hypothesis.\n',
  'validation-report.md': '# Validation Report\n\nRecord research, customer evidence, source quality, contradictions, and decision.\n',
  'product-requirements.md': '# Product Requirements\n\nDefine the smallest validated product, non-goals, user flows, and acceptance criteria.\n',
  'architecture.md': '# Architecture\n\nRecord boundaries, data flow, integrations, security model, and key decisions.\n',
  'risk-register.md': '# Risk Register\n\nTrack probability, impact, mitigation, contingency, owner, and status.\n',
  'execution-plan.md': '# Execution Plan\n\nBreak approved work into tasks with owners, dependencies, outputs, and evidence requirements.\n',
  'verification-report.md': '# Verification Report\n\nRecord actual test commands, outcomes, security checks, known issues, and acceptance results.\n',
  'release-plan.md': '# Release Plan\n\nRecord version, deployment steps, migration plan, rollback plan, approval, and post-release checks.\n',
  'operations-runbook.md': '# Operations Runbook\n\nRecord monitoring, alerts, support path, backups, incidents, and recovery steps.\n',
  'learning-record.md': '# Learning Record\n\nRecord metrics, feedback, surprises, lessons, and next decisions.\n'
};
for (const [file, content] of Object.entries(files)) await fs.writeFile(path.join(target, file), content);

console.log(`Initialized ${id} at ${path.relative(root, target)}`);
