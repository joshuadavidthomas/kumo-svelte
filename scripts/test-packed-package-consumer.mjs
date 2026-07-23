import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, realpath, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(repoRoot, "packages/kumo-svelte");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const phaseTimings = [];

const expectedExports = {
  "./components/badge": {
    svelte: "./src/components/badge/index.ts",
    types: "./src/components/badge/index.ts",
    default: "./src/components/badge/index.ts",
  },
  "./components/tabs": {
    svelte: "./src/components/tabs/index.ts",
    types: "./src/components/tabs/index.ts",
    default: "./src/components/tabs/index.ts",
  },
  "./styles": "./src/styles/kumo.css",
  "./styles/standalone": "./src/styles/kumo-standalone.css",
  "./utils": {
    types: "./src/utils/index.ts",
    default: "./src/utils/index.ts",
  },
  "./package.json": "./package.json",
};

const requiredPackageFiles = [
  "package.json",
  "README.md",
  "CHANGELOG.md",
  "LICENSE",
  "src/components/badge/index.ts",
  "src/components/badge/badge.svelte",
  "src/components/tabs/index.ts",
  "src/components/tabs/tabs-root.svelte",
  "src/components/tabs/tabs-list.svelte",
  "src/components/tabs/tabs-trigger.svelte",
  "src/components/tabs/tabs-content.svelte",
  "src/utils/index.ts",
  "src/utils/cn.ts",
  "src/styles/kumo.css",
  "src/styles/kumo-binding.css",
  "src/styles/kumo-standalone.css",
  "src/styles/theme-fedramp.css",
  "src/styles/theme-kumo.css",
];

function formatDuration(milliseconds) {
  return `${(milliseconds / 1000).toFixed(2)}s`;
}

async function phase(name, action) {
  const startedAt = performance.now();
  process.stdout.write(`[${name}] `);

  try {
    const result = await action();
    const duration = performance.now() - startedAt;
    phaseTimings.push({ name, duration });
    console.log(`passed (${formatDuration(duration)})`);
    return result;
  } catch (error) {
    const duration = performance.now() - startedAt;
    console.error(`failed (${formatDuration(duration)})`);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[${name}] ${message}`, { cause: error });
  }
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, CI: "1" },
    maxBuffer: 50 * 1024 * 1024,
  });

  if (result.error) throw result.error;

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(
      [`Command failed (${result.status ?? result.signal}): ${command} ${args.join(" ")}`, output]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return result.stdout.trim();
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function isWithin(path, parent) {
  const pathFromParent = relative(parent, path);
  return (
    pathFromParent !== "" &&
    pathFromParent !== ".." &&
    !pathFromParent.startsWith(`..${sep}`) &&
    !isAbsolute(pathFromParent)
  );
}

function inspectExportMap(packageJson, packageFiles) {
  for (const [exportPath, expected] of Object.entries(expectedExports)) {
    assert.deepEqual(packageJson.exports?.[exportPath], expected, `${exportPath} export changed`);

    const targets = typeof expected === "string" ? [expected] : Object.values(expected);
    for (const target of targets) {
      assert.ok(
        packageFiles.has(target.replace(/^\.\//, "")),
        `${exportPath} target is absent from the tarball: ${target}`,
      );
    }
  }
}

async function installedVersion(packageName) {
  const packageJsonPath = join(
    packageRoot,
    "node_modules",
    ...packageName.split("/"),
    "package.json",
  );
  return (await readJson(packageJsonPath)).version;
}

async function writeConsumer(consumerRoot, tarballPath) {
  const versions = Object.fromEntries(
    await Promise.all(
      [
        "@sveltejs/vite-plugin-svelte",
        "@tailwindcss/vite",
        "echarts",
        "svelte",
        "svelte-check",
        "tailwindcss",
        "typescript",
        "vite",
      ].map(async (packageName) => [packageName, await installedVersion(packageName)]),
    ),
  );

  await mkdir(join(consumerRoot, "src"), { recursive: true });
  await Promise.all([
    writeFile(
      join(consumerRoot, "package.json"),
      `${JSON.stringify(
        {
          name: "kumo-svelte-packed-consumer",
          private: true,
          type: "module",
          dependencies: {
            echarts: versions.echarts,
            "kumo-svelte": `file:${tarballPath}`,
            svelte: versions.svelte,
            tailwindcss: versions.tailwindcss,
          },
          devDependencies: {
            "@sveltejs/vite-plugin-svelte": versions["@sveltejs/vite-plugin-svelte"],
            "@tailwindcss/vite": versions["@tailwindcss/vite"],
            "svelte-check": versions["svelte-check"],
            typescript: versions.typescript,
            vite: versions.vite,
          },
        },
        null,
        2,
      )}\n`,
    ),
    writeFile(
      join(consumerRoot, "tsconfig.json"),
      `${JSON.stringify(
        {
          compilerOptions: {
            target: "ES2022",
            lib: ["ES2022", "DOM", "DOM.Iterable"],
            module: "ESNext",
            moduleResolution: "Bundler",
            strict: true,
            skipLibCheck: true,
            isolatedModules: true,
            verbatimModuleSyntax: true,
            types: ["svelte", "vite/client"],
          },
          include: ["src/**/*.ts", "src/**/*.svelte"],
        },
        null,
        2,
      )}\n`,
    ),
    writeFile(
      join(consumerRoot, "svelte.config.js"),
      `import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
};
`,
    ),
    writeFile(
      join(consumerRoot, "vite.config.js"),
      `import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
});
`,
    ),
    writeFile(
      join(consumerRoot, "index.html"),
      `<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
`,
    ),
    writeFile(
      join(consumerRoot, "src/app.css"),
      `@import "tailwindcss";
@import "kumo-svelte/styles";
@source "../node_modules/kumo-svelte/src";
`,
    ),
    writeFile(
      join(consumerRoot, "src/App.svelte"),
      `<script lang="ts">
  import { Badge } from "kumo-svelte/components/badge";
  import * as Tabs from "kumo-svelte/components/tabs";
  import { cn } from "kumo-svelte/utils";

  const shellClass = cn("packed-consumer", "text-kumo-default");
</script>

<main class={shellClass} data-conformance="packed-package">
  <Badge>Installed tarball</Badge>
  <Tabs.Root value="overview">
    <Tabs.List aria-label="Packed package sections">
      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      <Tabs.Trigger value="details">Details</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">Package exports resolved</Tabs.Content>
    <Tabs.Content value="details">Compound components rendered</Tabs.Content>
  </Tabs.Root>
</main>
`,
    ),
    writeFile(
      join(consumerRoot, "src/main.ts"),
      `import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

mount(App, { target: document.getElementById("app")! });
`,
    ),
    writeFile(
      join(consumerRoot, "src/entry-server.ts"),
      `import { render } from "svelte/server";
import App from "./App.svelte";

export function renderApp() {
  return render(App).body;
}
`,
    ),
  ]);
}

async function listFiles(root) {
  const files = [];

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else files.push(path);
    }
  }

  await visit(root);
  return files;
}

async function main() {
  let temporaryRoot;
  let primaryError;

  try {
    temporaryRoot = await mkdtemp(join(tmpdir(), "kumo-svelte-packed-consumer-"));
    const packRoot = join(temporaryRoot, "pack");
    const consumerRoot = join(temporaryRoot, "consumer");
    let packageFiles;
    let sourcePackageJson;
    let tarballPath;

    await phase("pack", async () => {
      await mkdir(packRoot, { recursive: true });
      sourcePackageJson = await readJson(join(packageRoot, "package.json"));
      const packOutput = run(pnpm, ["pack", "--pack-destination", packRoot, "--json"], packageRoot);
      const packResult = JSON.parse(packOutput);
      const tarballs = (await readdir(packRoot)).filter((file) => file.endsWith(".tgz"));

      assert.equal(tarballs.length, 1, `expected one tarball, found ${tarballs.length}`);
      assert.equal(
        tarballs[0],
        basename(packResult.filename),
        "pnpm pack output did not match the tarball",
      );
      tarballPath = join(packRoot, tarballs[0]);
      assert.ok((await stat(tarballPath)).size > 0, "packed tarball is empty");
      packageFiles = new Set(packResult.files.map(({ path }) => path));
    });

    await phase("packed artifact inspection", async () => {
      assert.equal(sourcePackageJson.name, "kumo-svelte");
      assert.deepEqual(sourcePackageJson.files, ["src", "README.md", "CHANGELOG.md", "LICENSE"]);
      for (const requiredFile of requiredPackageFiles) {
        assert.ok(packageFiles.has(requiredFile), `tarball is missing ${requiredFile}`);
      }
      assert.ok(
        ![...packageFiles].some((path) => path.includes("packed-package-consumer")),
        "consumer fixture leaked into the package",
      );
      inspectExportMap(sourcePackageJson, packageFiles);
    });

    await phase("install", async () => {
      await writeConsumer(consumerRoot, tarballPath);
      const installArgs = ["install", "--ignore-scripts", "--strict-peer-dependencies"];
      run(pnpm, [...installArgs, "--prefer-offline"], consumerRoot);
      run(pnpm, [...installArgs, "--offline", "--frozen-lockfile"], consumerRoot);

      const consumerPackageJson = await readJson(join(consumerRoot, "package.json"));
      assert.equal(
        consumerPackageJson.dependencies["kumo-svelte"],
        `file:${tarballPath}`,
        "consumer does not depend on the absolute tarball",
      );

      const lockfile = await readFile(join(consumerRoot, "pnpm-lock.yaml"), "utf8");
      assert.ok(lockfile.includes(basename(tarballPath)), "lockfile does not resolve the tarball");
      assert.ok(!lockfile.includes("workspace:"), "lockfile contains a workspace dependency");
      assert.ok(!lockfile.includes("link:"), "lockfile contains a linked dependency");

      const installedPackageRoot = await realpath(join(consumerRoot, "node_modules/kumo-svelte"));
      const sourcePackageRoot = await realpath(packageRoot);
      assert.ok(
        isWithin(installedPackageRoot, consumerRoot),
        `installed package escaped the consumer: ${installedPackageRoot}`,
      );
      assert.ok(
        !isWithin(installedPackageRoot, sourcePackageRoot) &&
          installedPackageRoot !== sourcePackageRoot,
        "consumer resolved the workspace package source",
      );
    });

    await phase("export resolution", async () => {
      const installedPackageJson = await readJson(
        join(consumerRoot, "node_modules/kumo-svelte/package.json"),
      );
      inspectExportMap(installedPackageJson, packageFiles);

      const resolutionScript = `
        import assert from "node:assert/strict";
        import { realpathSync } from "node:fs";
        import { relative, isAbsolute, sep } from "node:path";
        import { fileURLToPath } from "node:url";

        const consumerRoot = ${JSON.stringify(consumerRoot)};
        const sourceRoot = ${JSON.stringify(await realpath(packageRoot))};
        const expected = ${JSON.stringify({
          "kumo-svelte/components/badge": "src/components/badge/index.ts",
          "kumo-svelte/components/tabs": "src/components/tabs/index.ts",
          "kumo-svelte/styles": "src/styles/kumo.css",
          "kumo-svelte/styles/standalone": "src/styles/kumo-standalone.css",
          "kumo-svelte/utils": "src/utils/index.ts",
          "kumo-svelte/package.json": "package.json",
        })};

        for (const [specifier, suffix] of Object.entries(expected)) {
          const resolved = realpathSync(fileURLToPath(import.meta.resolve(specifier)));
          const normalized = resolved.split(sep).join("/");
          const fromConsumer = relative(consumerRoot, resolved);
          assert.ok(normalized.endsWith(suffix), specifier + " resolved to " + resolved);
          assert.ok(fromConsumer && fromConsumer !== ".." && !fromConsumer.startsWith(".." + sep) && !isAbsolute(fromConsumer), specifier + " escaped the consumer");
          assert.ok(resolved !== sourceRoot && !resolved.startsWith(sourceRoot + sep), specifier + " resolved workspace source");
        }
      `;
      run(
        process.execPath,
        ["--conditions=svelte", "--input-type=module", "--eval", resolutionScript],
        consumerRoot,
      );
    });

    await phase("typecheck", async () => {
      run(pnpm, ["exec", "svelte-check", "--tsconfig", "./tsconfig.json"], consumerRoot);
    });

    await phase("client build", async () => {
      run(
        pnpm,
        ["exec", "vite", "build", "--outDir", "dist/client", "--emptyOutDir"],
        consumerRoot,
      );
    });

    await phase("asset inspection", async () => {
      const clientFiles = await listFiles(join(consumerRoot, "dist/client"));
      const cssFiles = clientFiles.filter((path) => path.endsWith(".css"));
      const javaScriptFiles = clientFiles.filter((path) => path.endsWith(".js"));
      assert.ok(cssFiles.length > 0, "client build emitted no CSS asset");
      assert.ok(javaScriptFiles.length > 0, "client build emitted no JavaScript asset");

      const css = (await Promise.all(cssFiles.map((path) => readFile(path, "utf8")))).join("\n");
      assert.ok(css.includes("--color-kumo-brand"), "built CSS omitted Kumo theme variables");
      assert.ok(css.includes("animate-refresh"), "built CSS omitted Kumo component styles");
    });

    await phase("SSR build/render", async () => {
      run(
        pnpm,
        [
          "exec",
          "vite",
          "build",
          "--ssr",
          "src/entry-server.ts",
          "--outDir",
          "dist/server",
          "--emptyOutDir",
        ],
        consumerRoot,
      );
      const serverEntry = join(consumerRoot, "dist/server/entry-server.js");
      const serverModule = await import(pathToFileURL(serverEntry).href);
      assert.equal(typeof serverModule.renderApp, "function", "SSR bundle has no renderApp export");

      const html = await serverModule.renderApp();
      assert.ok(html.includes('data-conformance="packed-package"'), "SSR output lost its marker");
      assert.ok(html.includes("Installed tarball"), "SSR output omitted the direct component");
      assert.ok(html.includes("Package exports resolved"), "SSR output omitted compound content");
    });

    const totalDuration = phaseTimings.reduce((total, { duration }) => total + duration, 0);
    console.log(
      `Packed-package consumer conformance passed (${formatDuration(totalDuration)} total).`,
    );
    console.log("Hydration/browser interaction and tree-shaking checks were not run.");
  } catch (error) {
    primaryError = error;
    throw error;
  } finally {
    if (temporaryRoot) {
      try {
        await rm(temporaryRoot, { recursive: true, force: true });
      } catch (cleanupError) {
        if (!primaryError) throw cleanupError;
        console.error(`[cleanup] ${cleanupError.message}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
