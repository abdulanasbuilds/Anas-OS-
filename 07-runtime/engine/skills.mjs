import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from '../fs.mjs';

const SKILLS_DIR = path.join(ROOT, '02-domains', 'agent-system', 'skills');
const FRONT = /^---\n([\s\S]*?)\n---\n?/;

function parseFrontMatter(text) {
  const match = text.match(FRONT);
  const meta = {};
  if (!match) return meta;
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return meta;
}

export async function listSkills() {
  const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
  const skills = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'README.md') continue;
    const file = path.join(SKILLS_DIR, entry.name);
    const text = await fs.readFile(file, 'utf8');
    const meta = parseFrontMatter(text);
    skills.push({ id: meta.id ?? entry.name.replace(/\.md$/, ''), version: meta.version ?? 'unknown', purpose: meta.purpose ?? '', authority: meta.authority ?? 'unknown', file: path.relative(ROOT, file) });
  }
  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

export async function inspectSkill(id) {
  const safe = id.replace(/[^a-z0-9._-]/gi, '');
  if (safe !== id) throw new Error('Invalid skill id');
  const file = path.join(SKILLS_DIR, `${id}.md`);
  const text = await fs.readFile(file, 'utf8');
  return { metadata: parseFrontMatter(text), content: text, file: path.relative(ROOT, file) };
}
