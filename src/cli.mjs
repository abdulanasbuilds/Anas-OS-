#!/usr/bin/env node
import fs from 'node:fs/promises';
import { validateProject, validateRepositoryShape, loadJson } from './core/validate.mjs';
import { loadGates, evaluateAllGates } from './core/gates.mjs';
import { STAGES, canTransition } from './core/lifecycle.mjs';

const [, , command, ...args] = process.argv;

function usage() {
  console.log(`ANAS OS Core CLI\n\nCommands:\n  help                              Show this help\n  validate-repo                     Validate required core files\n  validate-project <manifest.json>  Validate a project manifest\n  gates <manifest.json>             Evaluate gates relevant to current stage\n  transition <from> <to>            Check whether a lifecycle transition is legal\n  stages                            Print lifecycle stages\n`);
}

async function validateRepo() {
  const raw = await fetchTreePaths();
  const result = validateRepositoryShape(raw);
  if (!result.valid) {
    console.error(`Repository validation failed. Missing: ${result.missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  console.log('ANAS OS repository validation: PASS');
}

async function fetchTreePaths() {
  // Local repository validation intentionally uses the filesystem so it works offline.
  const paths = [];
  async function walk(dir, prefix = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const relative = `${prefix}${entry.name}`;
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      if (entry.isDirectory()) await walk(`${dir}/${entry.name}`, `${relative}/`);
      else paths.push(relative);
    }
  }
  await walk(process.cwd());
  return paths;
}

async function validateProjectFile(path) {
  const project = await loadJson(path);
  const result = validateProject(project);
  console.log(JSON.stringify(result, null, 2));
  if (!result.valid) process.exitCode = 1;
}

async function gates(path) {
  const project = await loadJson(path);
  const definitions = await loadGates();
  const results = evaluateAllGates(project, definitions);
  console.log(JSON.stringify(results, null, 2));
  if (results.some((result) => result.status === 'blocked' || result.status === 'fail')) process.exitCode = 1;
}

function transition(from, to) {
  if (!STAGES.includes(from) || !STAGES.includes(to)) {
    console.error(`Unknown stage. Valid stages: ${STAGES.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  console.log(canTransition(from, to) ? `PASS: ${from} -> ${to}` : `BLOCK: ${from} -> ${to}`);
  if (!canTransition(from, to)) process.exitCode = 1;
}

switch (command) {
  case 'help':
  case undefined:
    usage();
    break;
  case 'validate-repo':
    await validateRepo();
    break;
  case 'validate-project':
    if (!args[0]) throw new Error('A project manifest path is required.');
    await validateProjectFile(args[0]);
    break;
  case 'gates':
    if (!args[0]) throw new Error('A project manifest path is required.');
    await gates(args[0]);
    break;
  case 'transition':
    transition(args[0], args[1]);
    break;
  case 'stages':
    console.log(STAGES.join('\n'));
    break;
  default:
    console.error(`Unknown command: ${command}`);
    usage();
    process.exitCode = 1;
}
