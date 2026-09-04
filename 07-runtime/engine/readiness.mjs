import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';
import { walkFiles, validateRepositoryShape } from '../validate.mjs';
import { loadRuntime } from './runtime.mjs';

const REQUIRED_MODULES = [
  './execution-engine.mjs', './authority.mjs', './context.mjs', './audit.mjs',
  './evidence.mjs', './approval.mjs', './workflow.mjs', './orchestration.mjs',
  './lifecycle.mjs', './risk.mjs', './skills.mjs', './memory.mjs', './advisor.mjs',
  './workflow-capture.mjs', './chief-of-staff.mjs', './scheduler.mjs', './briefing.mjs',
  './providers.mjs', './distribution.mjs', './resolution.mjs', './flywheel.mjs',
  './operating-loop.mjs', './runtime.mjs', './system-check.mjs'
];

const requiredFiles = [
  '00-foundation/constitution/CONSTITUTION.md',
  '01-kernel/README.md',
  '02-domains/agent-system/registry/agents.json',
  '02-domains/agent-system/registry/tools.json',
  '02-domains/agent-system/registry/skills.json',
  '02-domains/agent-system/providers/provider-registry.json',
  '03-workflows/project-lifecycle.json',
  '04-contracts/agents/execution-request.schema.json',
  '04-contracts/approvals/approval.schema.json',
  '05-templates/projects/standard/project.manifest.json',
  '06-knowledge/README.md',
  '07-runtime/index.mjs',
  '07-runtime/engine/runtime.mjs',
  '07-runtime/engine/operating-loop.mjs',
  'config/digital-engine-registry.json',
  '09-tests/unit/kernel.test.mjs'
];

async function exists(relativePath) {
  try { await fs.access(path.join(ROOT, relativePath)); return true; } catch { return false; }
}

async function parseJson(relativePath) {
  try {
    return { ok: true, value: JSON.parse(await fs.readFile(path.join(ROOT, relativePath), 'utf8')) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export async function readinessCheck() {
  const files = await walkFiles(ROOT);
  const shape = validateRepositoryShape(files);
  const runtime = await loadRuntime();
  const adapters = (await parseJson('07-runtime/config/adapters.json')).value ?? {};
  const engineRegistryResult = await parseJson('config/digital-engine-registry.json');
  const engineRegistry = engineRegistryResult.value ?? {};

  const moduleResults = [];
  for (const module of REQUIRED_MODULES) {
    try {
      await import(new URL(module, import.meta.url));
      moduleResults.push({ module, ok: true });
    } catch (error) {
      moduleResults.push({ module, ok: false, error: error.message });
    }
  }

  const fileResults = await Promise.all(requiredFiles.map(async file => ({ file, ok: await exists(file) })));
  const engines = Array.isArray(engineRegistry.engines) ? engineRegistry.engines : [];
  const engineIds = new Set(engines.map(engine => engine.id));
  const requiredEngineIds = ['distribution', 'resolution', 'flywheel'];
  const engineCoverage = requiredEngineIds.map(id => ({ id, ok: engineIds.has(id) }));
  const boundaryOk = adapters.policy?.credentialsNeverStoredInRepository === true
    && adapters.policy?.externalMutationsRequireApproval === true
    && adapters.policy?.externalProvidersDefault === 'not-configured';

  const checks = [
    { id: 'repository-shape', ok: shape.valid, detail: shape.errors ?? [] },
    { id: 'required-files', ok: fileResults.every(item => item.ok), detail: fileResults },
    { id: 'module-imports', ok: moduleResults.every(item => item.ok), detail: moduleResults },
    { id: 'agent-registry', ok: runtime.agents.size > 0, detail: `${runtime.agents.size} agents loaded` },
    { id: 'tool-registry', ok: runtime.tools.size > 0, detail: `${runtime.tools.size} tools loaded` },
    { id: 'security-boundary', ok: boundaryOk, detail: 'external providers default to not-configured; credentials stay out of repository; external mutations require approval' },
    { id: 'digital-engine-coverage', ok: engineRegistryResult.ok && engineCoverage.every(item => item.ok), detail: engineCoverage },
  ];

  const healthy = checks.every(check => check.ok);
  return {
    healthy,
    status: healthy ? 'ready-for-verified-execution' : 'not-ready',
    checks,
    runtime: {
      agents: runtime.agents.size,
      tools: runtime.tools.size,
      adaptersConfigured: Object.values(runtime.adapters?.adapters ?? {}).filter(value => value?.enabled).length,
      adaptersTotal: Object.keys(runtime.adapters?.adapters ?? {}).length,
    },
    limitations: [
      'External providers remain intentionally disabled until explicitly configured and authorized.',
      'Production deployment is not claimed by this check; deployment evidence must come from a real release gate.'
    ]
  };
}
