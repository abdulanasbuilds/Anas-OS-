import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';
import { loadRuntime } from './runtime.mjs';
import { validateRepositoryShape, walkFiles } from '../validate.mjs';

const TRANSCRIPT_ENGINES = [
  { id: 'distribution', runtime: '07-runtime/engine/distribution.mjs', skill: '02-domains/agent-system/skills/distribution-engine.md', source: 'video-1' },
  { id: 'resolution', runtime: '07-runtime/engine/resolution.mjs', skill: '02-domains/agent-system/skills/resolution-project.md', source: 'video-2' },
  { id: 'flywheel', runtime: '07-runtime/engine/flywheel.mjs', skill: '02-domains/agent-system/skills/flywheel-engine.md', source: 'video-3' }
];

async function exists(file) {
  try { await fs.access(path.join(ROOT, file)); return true; } catch { return false; }
}

export async function systemCheck() {
  const files = await walkFiles(ROOT);
  const shape = validateRepositoryShape(files);
  const runtime = await loadRuntime();
  const registryPath = path.join(ROOT, 'config/digital-engine-registry.json');
  let registry = null;
  let registryError = null;
  try {
    registry = JSON.parse(await fs.readFile(registryPath, 'utf8'));
  } catch (error) {
    registryError = error.message;
  }

  const transcriptFiles = TRANSCRIPT_ENGINES.flatMap(engine => [engine.runtime, engine.skill]);
  const requiredFiles = [
    '07-runtime/index.mjs',
    '07-runtime/engine/runtime.mjs',
    '07-runtime/engine/operating-loop.mjs',
    ...transcriptFiles,
    'config/digital-engine-registry.json',
    '03-workflows/distribution-resolution-loop.md',
    '03-workflows/distribution-resolution-flywheel-loop.md'
  ];
  const presence = await Promise.all(requiredFiles.map(exists));

  const registeredIds = new Set((registry?.engines ?? []).map(engine => engine.id));
  const registryCoverage = TRANSCRIPT_ENGINES.every(engine => registeredIds.has(engine.id));
  const sourceCoverage = TRANSCRIPT_ENGINES.every(engine => (registry?.engines ?? []).some(item => item.id === engine.id && item.source === engine.source));
  const transcriptFileStart = 3;
  const transcriptFileEnd = transcriptFileStart + transcriptFiles.length;
  const allTranscriptFilesPresent = presence.slice(transcriptFileStart, transcriptFileEnd).every(Boolean);
  const workflowsPresent = presence.at(-2) && presence.at(-1);

  const checks = [
    { id: 'repository-shape', ok: shape.valid, detail: shape.errors ?? [] },
    { id: 'agent-registry', ok: runtime.agents.size > 0, detail: `${runtime.agents.size} agents loaded` },
    { id: 'tool-registry', ok: runtime.tools.size > 0, detail: `${runtime.tools.size} tools loaded` },
    { id: 'adapter-boundary', ok: Boolean(runtime.adapters?.policy?.credentialsNeverStoredInRepository), detail: 'credential boundary enabled' },
    { id: 'transcript-engine-files', ok: allTranscriptFilesPresent, detail: `${TRANSCRIPT_ENGINES.length} transcript-derived engines have runtime + skill files` },
    { id: 'transcript-engine-registry', ok: !registryError && registryCoverage && sourceCoverage, detail: registryError ?? 'all transcript-derived engines are registered with source mapping' },
    { id: 'transcript-engine-workflows', ok: workflowsPresent, detail: 'integration workflows present' }
  ];

  return { healthy: checks.every(check => check.ok), checks };
}
