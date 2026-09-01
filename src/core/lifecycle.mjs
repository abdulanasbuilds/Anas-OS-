export const STAGES = Object.freeze([
  'discover',
  'validate',
  'define',
  'build',
  'verify',
  'release',
  'operate',
  'measure',
  'learn'
]);

const NEXT = new Map([
  ['discover', 'validate'],
  ['validate', 'define'],
  ['define', 'build'],
  ['build', 'verify'],
  ['verify', 'release'],
  ['release', 'operate'],
  ['operate', 'measure'],
  ['measure', 'learn'],
  ['learn', 'discover']
]);

export function nextStage(stage) {
  if (!NEXT.has(stage)) throw new Error(`Unknown ANAS OS stage: ${stage}`);
  return NEXT.get(stage);
}

export function canTransition(from, to) {
  return NEXT.get(from) === to;
}

export function transition(project, to) {
  if (!project || typeof project !== 'object') throw new TypeError('Project must be an object');
  if (!STAGES.includes(project.stage)) throw new Error(`Unknown current stage: ${project.stage}`);
  if (!canTransition(project.stage, to)) {
    throw new Error(`Invalid lifecycle transition: ${project.stage} -> ${to}`);
  }
  return { ...project, stage: to, updatedAt: new Date().toISOString() };
}
