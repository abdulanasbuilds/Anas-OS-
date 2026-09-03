import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';
import { loadRuntime } from './runtime.mjs';
import { validateRepositoryShape, walkFiles } from '../validate.mjs';
import { listProviders } from './providers.mjs';

export async function systemCheck() {
  const files = await walkFiles(ROOT);
  const shape = validateRepositoryShape(files);
  const runtime = await loadRuntime();
  const providers = await listProviders();
  const checks = [
    { id: 'repository-shape', ok: shape.valid, detail: shape.errors ?? [] },
    { id: 'agent-registry', ok: runtime.agents.size > 0, detail: `${runtime.agents.size} agents loaded` },
    { id: 'tool-registry', ok: runtime.tools.size > 0, detail: `${runtime.tools.size} tools loaded` },
    { id: 'adapter-boundary', ok: Boolean(runtime.adapters?.policy?.credentialsNeverStoredInRepository), detail: 'credential boundary enabled' },
    { id: 'provider-boundary', ok: providers.length > 0 && providers.every(p => p.apiKeyEnv ? !p.credentialPresent || !p.configured || p.enabled : true), detail: `${providers.length} provider definitions loaded; secrets remain outside repository` },
    { id: 'runtime-modules', ok: await Promise.all(['07-runtime/index.mjs','07-runtime/engine/runtime.mjs','07-runtime/engine/operating-loop.mjs','07-runtime/engine/providers.mjs'].map(async file => { try { await fs.access(path.join(ROOT, file)); return true; } catch { return false; } })).then(values => values.every(Boolean)), detail: 'runtime entrypoints present' }
  ];
  return { healthy: checks.every(check => check.ok), checks, providers: providers.map(({ id, enabled, configured, local, paid, capabilities }) => ({ id, enabled, configured, local, paid, capabilities })) };
}
