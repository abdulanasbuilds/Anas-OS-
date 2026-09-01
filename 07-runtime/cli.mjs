#!/usr/bin/env node
import fs from 'node:fs/promises';
import { validateProject, validateRepositoryShape, loadJson } from './validate.mjs';
import { loadGates, evaluateAllGates } from '../01-kernel/gates/gates.mjs';
import { STAGES, canTransition } from '../01-kernel/lifecycle/lifecycle.mjs';

const [, , command, ...args] = process.argv;

function usage() { console.log(`ANAS OS Runtime CLI\n\nCommands:\n  help                              Show this help\n  validate-repo                     Validate canonical repository structure\n  validate-project <manifest.json>  Validate a project manifest\n  gates <manifest.json>             Evaluate gates relevant to current stage\n  transition <from> <to>            Check whether a lifecycle transition is legal\n  stages                            Print lifecycle stages\n`); }

async function validateRepo() {
  const paths = await fetchTreePaths(); const result = validateRepositoryShape(paths);
  if (!result.valid) { console.error(`Repository validation failed. Missing: ${result.missing.join(', ')}`); process.exitCode = 1; return; }
  console.log('ANAS OS canonical repository validation: PASS');
}
async function fetchTreePaths() {
  const paths=[];
  async function walk(dir,prefix='') { for (const entry of await fs.readdir(dir,{withFileTypes:true})) { const relative=`${prefix}${entry.name}`; if (entry.name === '.git' || entry.name === 'node_modules') continue; if (entry.isDirectory()) await walk(`${dir}/${entry.name}`,`${relative}/`); else paths.push(relative); } }
  await walk(process.cwd()); return paths;
}
async function validateProjectFile(path) { const result=validateProject(await loadJson(path)); console.log(JSON.stringify(result,null,2)); if (!result.valid) process.exitCode=1; }
async function gates(path) { const project=await loadJson(path); const results=evaluateAllGates(project,await loadGates()); console.log(JSON.stringify(results,null,2)); if(results.some((r)=>r.status==='blocked'||r.status==='fail')) process.exitCode=1; }
function transition(from,to) { if(!STAGES.includes(from)||!STAGES.includes(to)){console.error(`Unknown stage. Valid stages: ${STAGES.join(', ')}`);process.exitCode=1;return;} const ok=canTransition(from,to); console.log(ok?`PASS: ${from} -> ${to}`:`BLOCK: ${from} -> ${to}`); if(!ok)process.exitCode=1; }

switch(command){case 'help':case undefined:usage();break;case 'validate-repo':await validateRepo();break;case 'validate-project':if(!args[0])throw new Error('A project manifest path is required.');await validateProjectFile(args[0]);break;case 'gates':if(!args[0])throw new Error('A project manifest path is required.');await gates(args[0]);break;case 'transition':transition(args[0],args[1]);break;case 'stages':console.log(STAGES.join('\n'));break;default:console.error(`Unknown command: ${command}`);usage();process.exitCode=1;}
