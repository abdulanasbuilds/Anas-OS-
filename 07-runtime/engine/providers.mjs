import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const CONFIG_FILE = path.join(ROOT, '07-runtime', 'config', 'providers.json');

async function loadConfig() {
  return JSON.parse(await fs.readFile(CONFIG_FILE, 'utf8'));
}

function env(name) { return name ? process.env[name] : undefined; }

function providerState(provider) {
  const baseUrl = provider.baseUrl ?? env(provider.baseUrlEnv);
  const apiKey = env(provider.apiKeyEnv);
  const model = env(provider.modelEnv) ?? provider.defaultModel;
  const credentialReady = !provider.apiKeyEnv || Boolean(apiKey);
  return {
    ...provider,
    baseUrl,
    model,
    configured: Boolean(provider.enabled && baseUrl && credentialReady),
    credentialPresent: Boolean(apiKey)
  };
}

export async function listProviders() {
  const config = await loadConfig();
  return (config.providers ?? []).map(providerState);
}

export async function resolveProvider(capability, { allowPaid = false, preferLocal = true } = {}) {
  const config = await loadConfig();
  const candidates = (config.providers ?? [])
    .map(providerState)
    .filter(p => p.enabled && p.capabilities?.includes(capability) && p.configured && (allowPaid || !p.paid));
  candidates.sort((a, b) => {
    const local = Number(Boolean(b.local)) - Number(Boolean(a.local));
    if (preferLocal && local) return local;
    return Number(b.configured) - Number(a.configured);
  });
  return candidates[0] ?? null;
}

function withTimeout(ms = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

async function chat(provider, messages, { timeoutMs = 30000 } = {}) {
  const { signal, clear } = withTimeout(timeoutMs);
  try {
    if (provider.adapter === 'ollama-chat') {
      const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/api/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ model: provider.model, messages, stream: false }),
        signal
      });
      if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.message?.content ?? '', raw: data };
    }

    if (provider.adapter === 'openai-compatible') {
      const headers = { 'content-type': 'application/json' };
      const key = env(provider.apiKeyEnv);
      if (key) headers.authorization = `Bearer ${key}`;
      const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/v1/chat/completions`, {
        method: 'POST', headers,
        body: JSON.stringify({ model: provider.model, messages, stream: false }),
        signal
      });
      if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.choices?.[0]?.message?.content ?? '', raw: data };
    }

    throw new Error(`Unsupported provider adapter: ${provider.adapter}`);
  } finally { clear(); }
}

export async function invokeAI({ messages, allowPaid = false, preferLocal = true, timeoutMs = 30000 } = {}) {
  if (!Array.isArray(messages) || !messages.length) throw new Error('AI messages are required');
  const provider = await resolveProvider('ai.chat', { allowPaid, preferLocal });
  if (!provider) return { status: 'not-configured', capability: 'ai.chat', triedPolicy: { allowPaid, preferLocal } };
  try {
    const result = await chat(provider, messages, { timeoutMs });
    return { status: 'completed', provider: provider.id, model: provider.model, ...result };
  } catch (error) {
    return { status: 'failed', provider: provider.id, model: provider.model, error: error.message };
  }
}

export async function transcribeAudio({ filePath, allowPaid = false, timeoutMs = 60000 } = {}) {
  if (!filePath) throw new Error('Audio file path is required');
  const provider = await resolveProvider('audio.transcribe', { allowPaid, preferLocal: true });
  if (!provider) return { status: 'not-configured', capability: 'audio.transcribe' };
  if (provider.adapter !== 'openai-compatible') return { status: 'failed', error: `Unsupported transcription adapter: ${provider.adapter}` };

  const { signal, clear } = withTimeout(timeoutMs);
  try {
    const form = new FormData();
    const bytes = await fs.readFile(path.resolve(process.cwd(), filePath));
    form.append('file', new Blob([bytes]), path.basename(filePath));
    form.append('model', provider.model);
    const headers = {};
    const key = env(provider.apiKeyEnv);
    if (key) headers.authorization = `Bearer ${key}`;
    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/v1/audio/transcriptions`, { method: 'POST', headers, body: form, signal });
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
    const data = await response.json();
    return { status: 'completed', provider: provider.id, text: data.text ?? '', raw: data };
  } catch (error) {
    return { status: 'failed', provider: provider.id, error: error.message };
  } finally { clear(); }
}
