import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './fs.mjs';

export function createAuditEvent({ type, actorType, actorId, objectType, objectId, data = {}, severity = 'info' }) {
  if (!type || !actorType || !actorId) throw new Error('Audit event requires type, actorType and actorId');
  return { id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, timestamp: new Date().toISOString(), type, severity, actor: { type: actorType, id: actorId }, object: objectId ? { type: objectType, id: objectId } : undefined, data };
}

export async function appendAuditEvent(event, file = '.anas/audit/events.ndjson') {
  const target = path.join(ROOT, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.appendFile(target, `${JSON.stringify(event)}\n`, 'utf8');
  return event;
}
