import fs from 'node:fs/promises';
import path from 'node:path';

export const ROOT = process.cwd();
export const CANONICAL = {
  foundation: path.join(ROOT, '00-foundation'),
  kernel: path.join(ROOT, '01-kernel'),
  domains: path.join(ROOT, '02-domains'),
  workflows: path.join(ROOT, '03-workflows'),
  contracts: path.join(ROOT, '04-contracts'),
  templates: path.join(ROOT, '05-templates'),
  knowledge: path.join(ROOT, '06-knowledge'),
  runtime: path.join(ROOT, '07-runtime'),
  projects: path.join(ROOT, '08-projects'),
  tests: path.join(ROOT, '09-tests'),
  tooling: path.join(ROOT, '10-tooling'),
  docs: path.join(ROOT, '11-docs')
};

export async function readJson(file) {
  return JSON.parse(await fs.readFile(path.resolve(ROOT, file), 'utf8'));
}

export async function writeJson(file, value) {
  const target = path.resolve(ROOT, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export async function exists(file) {
  try { await fs.access(path.resolve(ROOT, file)); return true; } catch { return false; }
}
