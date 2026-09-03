import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const CONFIG = path.join(ROOT, '07-runtime/config/adapters.json');

export async function loadAdapters() {
  return JSON.parse(await fs.readFile(CONFIG, 'utf8'));
}

export async function invokeAdapter(id, input = {}, { approval = false } = {}) {
  const config = await loadAdapters();
  const adapter = config.adapters?.[id];
  if (!adapter) return { status: 'unsupported', adapter: id };
  if (!adapter.enabled) return { status: 'not-configured', adapter: id, provider: adapter.provider, configured: false };
  if (config.policy?.externalMutationsRequireApproval && adapter.mutating && !approval) {
    return { status: 'approval-required', adapter: id, reason: 'External mutations require explicit approval' };
  }
  // Provider implementations are intentionally loaded through explicit adapters.
  // No credentials or network behavior are inferred by the core runtime.
  return { status: 'adapter-ready', adapter: id, provider: adapter.provider, inputAccepted: true, inputKeys: Object.keys(input) };
}
