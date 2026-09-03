#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateProject, validateRepositoryShape, loadJson, walkFiles } from './validate.mjs';
import { STAGES, canTransition } from './engine/lifecycle.mjs';
import { evaluateAllGates, loadGates } from './engine/gates.mjs';
import { listSkills, inspectSkill } from './engine/skills.mjs';
import { proposeLearning, approveLearning, readLearnings } from './engine/memory.mjs';
import { advise } from './engine/advisor.mjs';
import { captureWorkflow, writeWorkflowCapture } from './engine/workflow-capture.mjs';
import { analyzeChiefOfStaff } from './engine/chief-of-staff.mjs';
import { listSchedules, runSchedule } from './engine/scheduler.mjs';
import { planGoal } from './engine/operating-loop.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const [, , command, ...args] = process.argv;
function usage() { console.log(`ANAS OS Runtime\n\nCore:\n  help\n  validate-repo\n  validate-project <manifest.json>\n  gates <manifest.json>\n  transition <from> <to>\n  stages\n  inventory\n  doctor\n\nAgent System:\n  skill list\n  skill inspect <id>\n\nPersonal Operating Layer:\n  goal <goal text>\n  advisor <question>\n  memory list\n  memory propose <text>\n  memory approve <id>\n  workflow capture <text-file>\n  chief-of-staff <notes-file>\n  scheduler list\n  scheduler run <id>\n`); }
async function validateRepo() { const result = validateRepositoryShape(await walkFiles(ROOT)); console.log(JSON.stringify(result, null, 2)); if (!result.valid) process.exitCode=1; }
async function validateProjectFile(file) { const result=validateProject(await loadJson(path.resolve(process.cwd(), file))); console.log(JSON.stringify(result,null,2)); if(!result.valid) process.exitCode=1; }
async function gates(file) { const project=await loadJson(path.resolve(process.cwd(), file)); const results=evaluateAllGates(project, await loadGates(ROOT)); console.log(JSON.stringify(results,null,2)); if(results.some(r=>r.status==='blocked'||r.status==='fail')) process.exitCode=1; }
async function inventory() { const files=await walkFiles(ROOT); const groups={}; for(const file of files){const top=file.split('/')[0]; groups[top]=(groups[top]??0)+1;} console.log(JSON.stringify({totalFiles:files.length,groups},null,2)); }
async function doctor() { const required=[['package','package.json'],['constitution','00-foundation/constitution/CONSTITUTION.md'],['agent registry','02-domains/agent-system/registry/agents.json'],['skills','02-domains/agent-system/skills/README.md'],['memory policy','02-domains/agent-system/memory/memory-policy.md'],['runtime index','07-runtime/index.mjs'],['tests','09-tests/unit/kernel.test.mjs']]; const checks=[]; for(const [name,file] of required) checks.push([name,await exists(file)]); const result={checks:checks.map(([name,pass])=>({name,pass})),healthy:checks.every(([,pass])=>pass)}; console.log(JSON.stringify(result,null,2)); if(!result.healthy) process.exitCode=1; }
async function exists(file){try{await fs.access(path.join(ROOT,file));return true;}catch{return false;}}
try {
  if (command === 'help' || command === undefined) usage();
  else if (command === 'validate-repo') await validateRepo();
  else if (command === 'validate-project') { if(!args[0]) throw new Error('A project manifest path is required'); await validateProjectFile(args[0]); }
  else if (command === 'gates') { if(!args[0]) throw new Error('A project manifest path is required'); await gates(args[0]); }
  else if (command === 'transition') { if(!STAGES.includes(args[0]) || !STAGES.includes(args[1])) throw new Error(`Valid stages: ${STAGES.join(', ')}`); const pass=canTransition(args[0],args[1]); console.log(pass?'PASS':'BLOCK'); if(!pass) process.exitCode=1; }
  else if (command === 'stages') console.log(STAGES.join('\n'));
  else if (command === 'inventory') await inventory();
  else if (command === 'doctor') await doctor();
  else if (command === 'skill' && args[0] === 'list') console.log(JSON.stringify(await listSkills(),null,2));
  else if (command === 'skill' && args[0] === 'inspect') console.log((await inspectSkill(args[1])).content);
  else if (command === 'goal') console.log(JSON.stringify(await planGoal({goal:args.join(' ')}),null,2));
  else if (command === 'advisor') console.log(JSON.stringify(advise({question:args.join(' ')}),null,2));
  else if (command === 'memory' && args[0] === 'list') console.log(JSON.stringify(await readLearnings(),null,2));
  else if (command === 'memory' && args[0] === 'propose') console.log(JSON.stringify(await proposeLearning({text:args.slice(1).join(' ')}),null,2));
  else if (command === 'memory' && args[0] === 'approve') console.log(JSON.stringify(await approveLearning(args[1]),null,2));
  else if (command === 'workflow' && args[0] === 'capture') { const text=await fs.readFile(path.resolve(process.cwd(),args[1]),'utf8'); const capture=captureWorkflow(text); const saved=await writeWorkflowCapture(capture); console.log(JSON.stringify({...capture,saved},null,2)); }
  else if (command === 'chief-of-staff') { const text=await fs.readFile(path.resolve(process.cwd(),args[0]),'utf8'); console.log(JSON.stringify(analyzeChiefOfStaff(text),null,2)); }
  else if (command === 'scheduler' && args[0] === 'list') console.log(JSON.stringify(await listSchedules(),null,2));
  else if (command === 'scheduler' && args[0] === 'run') console.log(JSON.stringify(await runSchedule(args[1]),null,2));
  else { usage(); process.exitCode=1; }
} catch (error) { console.error(JSON.stringify({error:error.message},null,2)); process.exitCode=1; }
