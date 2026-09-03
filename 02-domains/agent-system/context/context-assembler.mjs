import { readJson } from '../07-runtime/fs.mjs';

export async function loadRegistry(path) { return readJson(path); }

export async function assembleAgentContext({ project = {}, task = {}, domain = {}, business = {}, customer = {}, product = {}, finance = {}, legal = {}, security = {}, vendor = {}, evidence = [], production = {} }) {
  return {
    project: pick(project, ['id','name','type','stage','owner','status']),
    task: pick(task, ['id','objective','status','authority','acceptanceCriteria','constraints']),
    domain,
    business,
    customer,
    product,
    finance,
    legal,
    security,
    vendor,
    evidence: evidence.map((e) => pick(e, ['id','type','status','claim','confidence','source','verification'])),
    production
  };
}

function pick(value, keys) { return Object.fromEntries(keys.filter((key) => value && value[key] !== undefined).map((key) => [key, value[key]])); }
