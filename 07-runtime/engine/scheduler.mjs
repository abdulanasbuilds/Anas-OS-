import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const SCHEDULE_FILE = path.join(ROOT, '07-runtime', 'config', 'schedules.json');

export async function listSchedules() {
  const raw = JSON.parse(await fs.readFile(SCHEDULE_FILE, 'utf8'));
  return raw.schedules ?? [];
}

export async function dueSchedules(now = new Date()) {
  const schedules = await listSchedules();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();
  return schedules.filter(item => item.enabled && (item.daysOfWeek ?? [0,1,2,3,4,5,6]).includes(day) && item.hour === hour && item.minute === minute);
}

export async function runSchedule(id, runners = {}) {
  const schedules = await listSchedules();
  const schedule = schedules.find(item => item.id === id);
  if (!schedule) throw new Error(`Schedule not found: ${id}`);
  if (!schedule.enabled) return { id, status: 'disabled' };
  const runner = runners[schedule.handler];
  if (typeof runner !== 'function') return { id, status: 'not-configured', handler: schedule.handler };
  return { id, status: 'completed', result: await runner(schedule) };
}
