import { cpSync, rmSync } from 'node:fs';

rmSync('docs', { recursive: true, force: true });
cpSync('dist', 'docs', { recursive: true });

console.log('docs/ synced from dist/');
