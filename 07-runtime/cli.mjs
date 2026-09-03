#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateProject, validateRepositoryShape, loadJson, walkFiles } from './validate.mjs';
import { STAGES, canTransition } from './engine/lifecycle.mjs';
import { evaluateAllGates, loadGates } from './engine/gates.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const [, , command, ...args] = process.argv;

function usage() { console.log(`ANAS OS Runtime\n\nCommands:\n  help\n  validate-repo\n  validate-project <manifest.json>\n  gates <manifest.json>\n  transition <from> <to>\n  stages\n  inventory\n  doctor\n`); }
async function validateRepo() { const paths = await walkFiles(ROOT); const result = validateRepositoryShape(paths); console.log(JSON.stringify(result, null, 2)); if (!result.valid) process.exitCode=1; }
async function validateProjectFile(file) { const result=validateProject(await loadJson(path.resolve(process.cwd(), file))); console.log(JSON.stringify(result,null,2)); if(!result.valid) process.exitCode=1; }
async function gates(file) { const project=await loadJson(path.resolve(process.cwd(), file)); const results=evaluateAllGates(project, await loadGates(ROOT)); console.log(JSON.stringify(results,null,2)); if(results.some(r=>r.status==='blocked'||r.status==='fail')) process.exitCode=1; }
async function inventory() { const files=await walkFiles(ROOT); const groups={}; for(const file of files){const top=file.split('/')[0]; groups[top]=(groups[top]??0)+1;} console.log(JSON.stringify({totalFiles:files.length,groups},null,2)); }
async function doctor() { const checks=[]; checks.push(['package', await exists('package.json')]); checks.push(['constitution', await exists('00-foundation/constitution/CONSTITUTION.md')]); checks.push(['agent registry', await exists('02-domains/agent-system/registry/agents.json')]); checks.push(['runtime index', await exists('07-runtime/index.mjs')]); checks.push(['tests', await exists('09-tests/unit/kernel.test.mjs')]); const result={checks:checks.map(([name,pass])=>({name,pass})),healthy:checks.every(([,pass])=>pass)}; console.log(JSON.stringify(result,null,2)); if(!result.healthy) process.exitCode=1; }
async function exists(file){try{await fs.access(path.join(ROOT,file));return true;}catch{return false;}}

switch(command){case 'help':case undefined:usage();break;case 'validate-repo':await validateRepo();break;case 'validate-project':if(!args[0])throw new Error('A project manifest path is required');await validateProjectFile(args[0]);break;case 'gates':if(!args[0])throw new Error('A project manifest path is required');await gates(args[0]);break;case 'transition':if(!STAGES.includes(args[0])||!STAGES.includes(args[1])) throw new Error(`Valid stages: ${STAGES.join(', ')}`); console.log(canTransition(args[0],args[1])?'PASS':'BLOCK'); if(!canTransition(args[0],args[1]))process.exitCode=1; break;case 'stages':console.log(STAGES.join('\n'));break;case 'inventory':await inventory();break;case 'doctor':await doctor();break;default:usage();process.exitCode=1;}
