import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const require = createRequire(import.meta.url);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const themeFiles = [
  {
    source: "@cloudflare/kumo/styles/theme-kumo",
    target: "packages/kumo-svelte/src/styles/theme-kumo.css",
  },
  {
    source: "@cloudflare/kumo/styles/theme-fedramp",
    target: "packages/kumo-svelte/src/styles/theme-fedramp.css",
  },
];

let hasDrift = false;

for (const file of themeFiles) {
  const sourcePath = require.resolve(file.source);
  const targetPath = resolve(repoRoot, file.target);
  const [source, target] = await Promise.all([
    readFile(sourcePath, "utf8"),
    readFile(targetPath, "utf8").catch((error) => {
      if (error.code === "ENOENT") return undefined;
      throw error;
    }),
  ]);

  if (target === source) {
    console.log(`✓ ${file.target} matches ${file.source}`);
    continue;
  }

  hasDrift = true;

  if (check) {
    console.error(`✗ ${file.target} differs from ${file.source}`);
    console.error(`  upstream: ${relative(repoRoot, sourcePath)}`);
    continue;
  }

  await writeFile(targetPath, source);
  console.log(`Updated ${file.target} from ${file.source}`);
}

if (check && hasDrift) {
  console.error("\nRun `pnpm sync:upstream-theme` to update generated theme files.");
  process.exit(1);
}
