import { loadAdapters } from './adapters.mjs';
import { listSkills } from './skills.mjs';
import { readLearnings } from './memory.mjs';

export async function runtimeHealth({ agents, tools } = {}) {
  const adapters = await loadAdapters();
  const skills = await listSkills();
  const learnings = await readLearnings();
  return {
    status: 'operational',
    agentsLoaded: agents?.size ?? 0,
    toolsLoaded: tools?.size ?? 0,
    skillsLoaded: skills.length,
    learningsTracked: Array.isArray(learnings) ? learnings.length : 0,
    externalAdapters: Object.fromEntries(Object.entries(adapters.adapters ?? {}).map(([id, cfg]) => [id, cfg.enabled ? 'enabled' : 'not-configured'])),
    executionBoundary: {
      credentialsInRepository: false,
      externalMutationsRequireApproval: Boolean(adapters.policy?.externalMutationsRequireApproval),
      autonomousExternalSideEffects: false
    }
  };
}
