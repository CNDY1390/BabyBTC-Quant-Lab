import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

console.log('Building BabyBTC Project...');

// Build landing page
console.log('Building landing page...');
process.chdir('landingpage');
execSync('pnpm install', { stdio: 'inherit' });
execSync('pnpm build', { stdio: 'inherit' });
process.chdir('..');

// Build frontend app
console.log('Building frontend app...');
process.chdir('frontend');
execSync('pnpm install', { stdio: 'inherit' });
execSync('pnpm build', { stdio: 'inherit' });
process.chdir('..');

// Create public directory structure
console.log('Creating deployment structure...');
await fs.ensureDir('public');
await fs.ensureDir('public/app');

// Copy landing page to root
await fs.copy('landingpage/dist', 'public');

// Copy frontend to /app
await fs.copy('frontend/dist', 'public/app');

console.log('Build complete!');
