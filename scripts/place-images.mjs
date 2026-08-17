#!/usr/bin/env node
/**
 * Moves generated images into public/images/.
 *
 * Accepts either naming convention:
 *   - the target filename, e.g. "smart-taxi-hero.jpg" or "home/hero.jpg"
 *   - the manifest index, e.g. "001.jpg" through "081.jpg"
 *
 * Usage: node scripts/place-images.mjs <folder>
 *        node scripts/place-images.mjs <folder> --dry
 */

import {
  readdirSync, mkdirSync, copyFileSync, existsSync, statSync, readFileSync,
} from "node:fs";
import { basename, extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifestPath = join(root, "docs/image-manifest.md");
const publicImages = join(root, "public/images");

const source = process.argv[2];
const dryRun = process.argv.includes("--dry");

if (!source) {
  console.error("Usage: node scripts/place-images.mjs <folder> [--dry]");
  process.exit(1);
}
if (!existsSync(source) || !statSync(source).isDirectory()) {
  console.error(`Not a directory: ${source}`);
  process.exit(1);
}

/** Parse the manifest into ordered [index, relativePath] entries. */
function readManifest() {
  const md = existsSync(manifestPath) ? readFileSync(manifestPath, "utf8") : "";
  const entries = [];
  const re = /^###\s+(\d{3})\s+·\s+`([^`]+)`/gm;
  let m;
  while ((m = re.exec(md))) entries.push({ index: m[1], path: m[2] });
  return entries;
}

const manifest = readManifest();
if (manifest.length === 0) {
  console.error("Could not parse docs/image-manifest.md");
  process.exit(1);
}

const byIndex = new Map(manifest.map((e) => [e.index, e.path]));
const byBasename = new Map(manifest.map((e) => [basename(e.path), e.path]));
const byFullPath = new Map(manifest.map((e) => [e.path, e.path]));

const files = readdirSync(source).filter((f) =>
  [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase()),
);

const placed = [];
const unmatched = [];

for (const file of files) {
  const stem = basename(file, extname(file));
  // Generators commonly append their own suffixes, e.g. "001_2K_202608172044".
  // A leading three-digit run is treated as the manifest index.
  const prefix = /^(\d{3})(?:\D|$)/.exec(stem)?.[1];
  const target =
    byFullPath.get(file) ??
    byBasename.get(`${stem}.jpg`) ??
    byIndex.get(stem.padStart(3, "0")) ??
    (prefix ? byIndex.get(prefix) : undefined);

  if (!target) {
    unmatched.push(file);
    continue;
  }

  const dest = join(publicImages, target);
  if (!dryRun) {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(source, file), dest);
  }
  placed.push({ from: file, to: `public/images/${target}` });
}

for (const p of placed) console.log(`${dryRun ? "would place" : "placed"}  ${p.from}  ->  ${p.to}`);

if (unmatched.length) {
  console.log(`\nUnmatched (${unmatched.length}):`);
  for (const f of unmatched) console.log(`  ${f}`);
}

const missing = manifest.filter((e) => !existsSync(join(publicImages, e.path)));
console.log(
  `\n${placed.length} placed, ${unmatched.length} unmatched, ` +
    `${dryRun ? "?" : missing.length} of ${manifest.length} still missing`,
);

if (!dryRun && missing.length) {
  console.log("\nStill missing:");
  for (const e of missing) console.log(`  ${e.index}  ${e.path}`);
}
