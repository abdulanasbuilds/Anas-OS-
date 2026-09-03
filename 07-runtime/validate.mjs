import fs from 'node:fs/promises';

export async function loadJson(file) { return JSON.parse(await fs.readFile(file, 'utf8')); }

export function validateProject(project) {
  const errors=[];
  for(const key of ['id','name','type','stage','business','product','engineering','evidence']) if(project?.[key]===undefined||project?.[key]===null) errors.push(`Missing required field: ${key}`);
  if(project?.stage && !['discover','validate','define','build','verify','release','operate','measure','learn'].includes(project.stage)) errors.push(`Invalid stage: ${project.stage}`);
  if(project?.business){
    if(!project.business.problem||project.business.problem.length<10) errors.push('business.problem must be at least 10 characters');
    if(!project.business.targetCustomer||project.business.targetCustomer.length<3) errors.push('business.targetCustomer is required');
    if(!project.business.desiredOutcome) errors.push('business.desiredOutcome is required');
  }
  if(!Array.isArray(project?.evidence?.items)) errors.push('evidence.items must be an array');
  if(project?.metadata?.containsSecrets===true) errors.push('Policy violation: metadata.containsSecrets=true');
  if(project?.metadata?.securityBypass===true) errors.push('Policy violation: metadata.securityBypass=true');
  return {valid:errors.length===0,errors};
}

export function validateRepositoryShape(treePaths){
  const required=[
    '00-foundation/constitution/CONSTITUTION.md',
    '00-foundation/constitution/authority-model.md',
    '00-foundation/governance/governance-rules.md',
    '00-foundation/evidence/evidence-standard.md',
    '00-foundation/identity/operator-profile.md',
    '01-kernel/objects/registry.json',
    '01-kernel/policies/policy-registry.json',
    '01-kernel/policies/gate-registry.json',
    '02-domains/agent-system/README.md',
    '02-domains/agent-system/registry/agents.json',
    '02-domains/agent-system/registry/skills.json',
    '02-domains/agent-system/registry/harnesses.json',
    '02-domains/agent-system/registry/tools.json',
    '03-workflows/project-lifecycle.json',
    '03-workflows/workflow-registry.json',
    '04-contracts/agents/execution-request.schema.json',
    '04-contracts/agents/agent.schema.json',
    '04-contracts/tools/tool.schema.json',
    '04-contracts/approvals/approval.schema.json',
    '04-contracts/events/event.schema.json',
    '04-contracts/agent-contracts/agent-contract.md',
    '05-templates/projects/standard/project.manifest.json',
    '07-runtime/index.mjs',
    '07-runtime/engine/execution-engine.mjs',
    '09-tests/unit/kernel.test.mjs',
    '10-tooling/validators/repository-validator.mjs',
    '11-docs/architecture/canonical-architecture.md'
  ];
  const set=new Set(treePaths); const missing=required.filter(p=>!set.has(p));
  return {valid:missing.length===0,requiredCount:required.length,missing};
}

export async function walkFiles(root){
  const result=[];
  async function walk(dir,prefix=''){
    const entries=await fs.readdir(dir,{withFileTypes:true});
    for(const entry of entries){
      if(entry.name==='node_modules'||entry.name==='.git'||entry.name.startsWith('.anas')) continue;
      const rel=`${prefix}${entry.name}`;
      if(entry.isDirectory()) await walk(`${dir}/${entry.name}`,`${rel}/`); else result.push(rel);
    }
  }
  await walk(root); return result.sort();
}
