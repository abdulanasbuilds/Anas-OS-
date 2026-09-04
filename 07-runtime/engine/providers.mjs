import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const REGISTRY = path.join(ROOT, '02-domains', 'agent-system', 'providers', 'provider-registry.json');

async function readRegistry() {
  return JSON.parse(await fs.readFile(REGISTRY, 'utf8'));
}

function configured(def, env) {
  const cfg = def.configuration ?? {};
  if (def.class === 'local') return true;
  return Boolean(env[cfg.endpointEnv] && (!cfg.apiKeyEnv || env[cfg.apiKeyEnv]));
}

export async function listProviders({ family, env = process.env } = {}) {
  const registry = await readRegistry();
  return (registry.providers ?? [])
    .filter(provider => !family || provider.family === family)
    .map(provider => ({
      ...provider,
      configured: configured(provider, env),
      effectiveState: provider.class === 'local' ? 'available' : configured(provider, env) ? 'configured' : 'not-configured'
    }))
    .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}

export async function selectProvider({ family, capability, preferredId, allowNetwork = true, env = process.env } = {}) {
  const providers = await listProviders({ family, env });
  const eligible = providers.filter(provider =>
    (!capability || provider.capabilities.includes(capability)) &&
    provider.effectiveState !== 'not-configured' &&
    (allowNetwork || provider.network === false)
  );
  if (preferredId) {
    const preferred = eligible.find(provider => provider.id === preferredId);
    if (preferred) return preferred;
  }
  return eligible[0] ?? null;
}

export function runBuiltin({ operation, input = {} } = {}) {
  if (operation === 'structured-response') {
    return {
      provider: 'builtin.local',
      status: 'completed',
      mode: 'deterministic-fallback',
      output: {
        operation,
        summary: typeof input.prompt === 'string' ? input.prompt.trim() : 'No prompt supplied.',
        next: 'Use an explicitly configured provider for model-generated reasoning.'
      }
    };
  }
  throw new Error(`Unsupported builtin provider operation: ${operation}`);
}

export async function invokeProvider({ family, capability, preferredId, operation, input = {}, allowNetwork = true, env = process.env } = {}) {
  const provider = await selectProvider({ family, capability, preferredId, allowNetwork, env });
  if (!provider) return { status: 'not-configured', family, capability, reason: 'No eligible provider is configured.' };
  if (provider.id === 'builtin.local') return runBuiltin({ operation, input });
  return {
    status: 'configured',
    provider: provider.id,
    family: provider.family,
    capability,
    adapter: 'external-http-contract',
    configuration: provider.configuration
  };
}
