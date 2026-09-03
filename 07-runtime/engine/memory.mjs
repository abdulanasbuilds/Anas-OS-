import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const MEMORY_FILE = path.join(ROOT, '02-domains', 'agent-system', 'memory', 'learnings.jsonl');
const MAX_BYTES = 65536;

export async function readLearnings() {
  try {
    const text = await fs.readFile(MEMORY_FILE, 'utf8');
    return text.split('\n').filter(Boolean).map(line => JSON.parse(line));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function proposeLearning({ text, source = 'operator', tags = [], confidence = 1 }) {
  if (!text?.trim()) throw new Error('Learning text is required');
  const proposal = { id: `learn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, status: 'proposed', createdAt: new Date().toISOString(), source, text: text.trim(), tags, confidence: Number(confidence) };
  await fs.mkdir(path.dirname(MEMORY_FILE), { recursive: true });
  const existing = await readLearnings();
  const serialized = [...existing, proposal].map(item => JSON.stringify(item)).join('\n') + '\n';
  if (Buffer.byteLength(serialized, 'utf8') > MAX_BYTES) throw new Error('Learning ledger limit reached; review/archive before adding more.');
  await fs.writeFile(MEMORY_FILE, serialized, 'utf8');
  return proposal;
}

export async function approveLearning(id) {
  const items = await readLearnings();
  const item = items.find(x => x.id === id);
  if (!item) throw new Error(`Learning not found: ${id}`);
  item.status = 'approved';
  item.approvedAt = new Date().toISOString();
  await fs.writeFile(MEMORY_FILE, items.map(x => JSON.stringify(x)).join('\n') + '\n', 'utf8');
  return item;
}
