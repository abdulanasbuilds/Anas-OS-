#!/usr/bin/env node
import path from 'node:path';
import { walkFiles, validateRepositoryShape } from '../../07-runtime/validate.mjs';

const root = path.resolve(new URL('../..', import.meta.url).pathname);
const files = await walkFiles(root);
const result = validateRepositoryShape(files);
console.log(JSON.stringify(result, null, 2));
if (!result.valid) process.exit(1);
