// Meridian Statistics — hand-in program for make.fun's national statistics site bounty.
//
// The grader runs this file with Node 22 in a container where the repository is mounted
// read-only and /output is writable. The job is small and fixed: copy the static site in
// app/ and the screenshots in screenshots/ into the output directory, then write
// dossier.json with buildDossier from the vendored make.fun frontend library. The scorer
// rebuilds the dossier with its own copy of that library and compares byte for byte, so
// the caps passed here mirror the scorer's caps exactly.
//
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly on a broken hand-in rather than writing a dossier the gate would refuse:
// the site entry page must exist and screenshots/ must hold 3 or 4 images.
if (!existsSync(join(repoRoot, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing; the site cannot be handed in');
}
const shotNames = existsSync(join(repoRoot, 'screenshots'))
  ? readdirSync(join(repoRoot, 'screenshots')).filter((name) => !name.startsWith('.'))
  : [];
if (shotNames.length < 3 || shotNames.length > 4) {
  throw new Error(`screenshots/ must hold 3 or 4 images, found ${shotNames.length}`);
}

function copyTree(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree(join(repoRoot, 'app'), join(outputDir, 'app'));

const shotsDir = join(repoRoot, 'screenshots');
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  copyTree(shotsDir, join(outputDir, 'screenshots'));
}

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

const shotCount = readdirSync(join(outputDir, 'screenshots')).length;
console.log(`dossier written: ${dossier.length} bytes, ${shotCount} screenshots`);
