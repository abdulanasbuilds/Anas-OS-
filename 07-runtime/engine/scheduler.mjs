import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';
import { planDailyBriefing, planWeeklyReview } from './briefing.mjs';
import { analyzeChiefOfStaff } from './chief-of-staff.mjs';

const SCHEDULE_FILE = path.join(ROOT, '07-runtime', 'config', 'schedules.json');

async function loadConfig() { return JSON.parse(await fs.readFile(SCHEDULE_FILE, 'utf8')); }

export async function listSchedules() {
  const raw = await loadConfig();
  return raw.schedules ?? [];
}

function zonedParts(date, timezone) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date);
  return Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
}

export async function dueSchedules(now = new Date()) {
  const config = await loadConfig();
  const timezone = config.policy?.timezone ?? 'UTC';
  const parts = zonedParts(now, timezone);
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = dayMap[parts.weekday];
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  return (config.schedules ?? []).filter(item => item.enabled && (item.daysOfWeek ?? [0,1,2,3,4,5,6]).includes(day) && item.hour === hour && item.minute === minute);
}

async function defaultRunners() {
  return {
    'briefing.plan': schedule => planDailyBriefing({ date: schedule.id }),
    'review.prepare': schedule => planWeeklyReview({ week: schedule.id }),
    'chief-of-staff.scan': async () => ({ type: 'chief-of-staff', status: 'awaiting-input', result: analyzeChiefOfStaff('No notes supplied. Provide meeting notes, messages, or task records to scan for commitments and blockers.') })
  };
}

export async function runSchedule(id, runners = {}) {
  const schedules = await listSchedules();
  const schedule = schedules.find(item => item.id === id);
  if (!schedule) throw new Error(`Schedule not found: ${id}`);
  if (!schedule.enabled) return { id, status: 'disabled' };
  const merged = { ...(await defaultRunners()), ...runners };
  const runner = merged[schedule.handler];
  if (typeof runner !== 'function') return { id, status: 'not-configured', handler: schedule.handler };
  return { id, status: 'completed', result: await runner(schedule) };
}
