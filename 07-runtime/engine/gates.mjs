import fs from 'node:fs/promises';
import path from 'node:path';

export async function loadGates(root=process.cwd()) {
  const candidates=[path.join(root,'01-kernel/policies/gate-registry.json'),path.join(root,'policies/gate-registry.json')];
  for(const file of candidates){try{return JSON.parse(await fs.readFile(file,'utf8'));}catch{}}
  throw new Error('Gate registry not found');
}

function getPath(object, pathString){return pathString.split('.').reduce((value,key)=>value?.[key],object);}
function requirementMet(project, requirement){
  const value=getPath(project, requirement.field ?? requirement.path ?? '');
  if(requirement.equals !== undefined) return value===requirement.equals;
  if(requirement.truthy === true) return Boolean(value);
  if(requirement.exists === true) return value !== undefined && value !== null;
  return value !== undefined && value !== null && value !== '';
}

export function evaluateGate(gate, project){
  const requirements=gate.requirements ?? gate.requiredEvidence ?? gate.evidence ?? [];
  const checks=requirements.map((requirement)=>({requirement,met:requirementMet(project,requirement)}));
  const securityBlocked=project?.security?.releaseBlock === true || project?.metadata?.securityBypass === true;
  const passed=!securityBlocked && checks.every((check)=>check.met);
  return {id:gate.id,name:gate.name,status:securityBlocked?'blocked':passed?'pass':'fail',checks};
}

export function evaluateAllGates(project, registry){
  const gates=Array.isArray(registry)?registry:(registry?.gates ?? []);
  return gates.map((gate)=>evaluateGate(gate,project));
}
