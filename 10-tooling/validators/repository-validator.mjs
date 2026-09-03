#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkFiles, validateRepositoryShape } from '../../07-runtime/validate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const files = await walkFiles(root);
const result = validateRepositoryShape(files);
console.log(JSON.stringify(result, null, 2));
if (!result.valid) process.exit(1);
