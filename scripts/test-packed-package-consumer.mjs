import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, mkdir, readFile, readdir, realpath, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";
import { observableContracts } from "../packages/kumo-svelte/tests/observable/contracts.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(repoRoot, "packages/kumo-svelte");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const phaseTimings = [];

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

function concreteExportTargets(value, exportPath, targets) {
  if (typeof value === "string") {
    assert.ok(value.startsWith("./"), `${exportPath} target must be package-relative: ${value}`);
    if (!value.includes("*")) targets.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const candidate of value) concreteExportTargets(candidate, exportPath, targets);
    return;
  }
  if (value && typeof value === "object") {
    for (const candidate of Object.values(value)) {
      concreteExportTargets(candidate, exportPath, targets);
    }
    return;
  }
  assert.equal(value, null, `${exportPath} has an unsupported export-map target`);
}

function inspectExportMap(packageJson, packageFiles) {
  assert.ok(
    packageJson.exports && typeof packageJson.exports === "object",
    "package has no exports",
  );
  const targets = new Set();
  for (const [exportPath, target] of Object.entries(packageJson.exports)) {
    concreteExportTargets(target, exportPath, targets);
  }
  assert.ok(targets.size > 0, "package exports contain no concrete targets");
  for (const target of targets) {
    assert.ok(
      packageFiles.has(target.replace(/^\.\//, "")),
      `concrete export target is absent from the tarball: ${target}`,
    );
  }
  return targets.size;
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
  import { Button } from "kumo-svelte/components/button";
  import {
    CollapsiblePanel,
    CollapsibleRoot,
    CollapsibleTrigger,
  } from "kumo-svelte/components/collapsible";
  import { Input } from "kumo-svelte/components/input";
  import { cn } from "kumo-svelte/utils";

  const shellClass = cn("packed-consumer", "text-kumo-default");
  let events = $state<Record<string, string[]>>({});
  let inputValue = $state("");

  function record(vector: string, event: string) {
    events[vector] = [...(events[vector] ?? []), event];
  }
</script>

<main class={shellClass} data-conformance="packed-package">
  <section
    data-component="button"
    data-events={JSON.stringify(events["enabled-primary-click"] ?? [])}
    data-vector="enabled-primary-click"
  >
    <Button
      variant="primary"
      onclick={(event) => record("enabled-primary-click", event.isTrusted ? "click" : "untrusted-click")}
    >Save changes</Button>
  </section>

  <section
    data-component="button"
    data-events={JSON.stringify(events["enabled-primary-keyboard-activation"] ?? [])}
    data-vector="enabled-primary-keyboard-activation"
  >
    <Button
      variant="primary"
      onclick={(event) => record("enabled-primary-keyboard-activation", event.isTrusted ? "click" : "untrusted-click")}
    >Save changes</Button>
  </section>

  <section
    data-component="button"
    data-events={JSON.stringify(events["loading-disables-activation"] ?? [])}
    data-vector="loading-disables-activation"
  >
    <Button
      loading
      onclick={(event) => record("loading-disables-activation", event.isTrusted ? "click" : "untrusted-click")}
    >Save changes</Button>
  </section>

  <section
    data-component="input"
    data-events={JSON.stringify(events["label-description-and-required-control"] ?? [])}
    data-vector="label-description-and-required-control"
  >
    <Input
      id="contract-email"
      type="email"
      name="email"
      label="Email address"
      description="Used for account alerts."
      required
    />
  </section>

  <section
    data-component="input"
    data-events={JSON.stringify(events["typing-updates-value-and-focus"] ?? [])}
    data-vector="typing-updates-value-and-focus"
  >
    <Input
      aria-label="Search query"
      name="query"
      bind:value={inputValue}
      oninput={(event) => record(
        "typing-updates-value-and-focus",
        event.isTrusted ? \`input:\${event.currentTarget.value}\` : "untrusted-input",
      )}
    />
  </section>

  <section
    data-component="collapsible"
    data-events={JSON.stringify(events["trigger-opens-related-panel"] ?? [])}
    data-vector="trigger-opens-related-panel"
  >
    <CollapsibleRoot
      onOpenChange={(open) => record("trigger-opens-related-panel", \`open:\${open}\`)}
    >
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsiblePanel forceMount>Retention: 30 days</CollapsiblePanel>
    </CollapsibleRoot>
  </section>
</main>
`,
    ),
    writeFile(
      join(consumerRoot, "src/main.ts"),
      `import { hydrate } from "svelte";
import App from "./App.svelte";
import "./app.css";

declare global {
  var __packedHydration:
    | {
        ready: true;
        representativeRootPreserved: boolean;
        vectorRootsPreserved: boolean;
      }
    | undefined;
  var __packedTrustedEvents:
    | { key?: string; trusted: boolean; type: string; vector: string }[]
    | undefined;
}

const target = document.getElementById("app")!;
const serverVectorRoots = [...target.querySelectorAll("[data-vector]")];
const representativeRoot = serverVectorRoots.find(
  (element) => element.getAttribute("data-vector") === "enabled-primary-click",
);

hydrate(App, { recover: false, target });

globalThis.__packedTrustedEvents = [];
for (const type of ["click", "input", "keydown", "pointerdown"]) {
  document.addEventListener(
    type,
    (event) => {
      const element = event.target instanceof Element ? event.target : null;
      const vector = element?.closest<HTMLElement>("[data-vector]")?.dataset.vector;
      if (vector) {
        globalThis.__packedTrustedEvents!.push({
          ...(event instanceof KeyboardEvent ? { key: event.key } : {}),
          trusted: event.isTrusted,
          type: event.type,
          vector,
        });
      }
    },
    true,
  );
}

queueMicrotask(() => {
  const hydratedVectorRoots = [...target.querySelectorAll("[data-vector]")];
  globalThis.__packedHydration = {
    ready: true,
    representativeRootPreserved:
      representativeRoot === target.querySelector('[data-vector="enabled-primary-click"]'),
    vectorRootsPreserved:
      serverVectorRoots.length === 6 &&
      hydratedVectorRoots.length === serverVectorRoots.length &&
      serverVectorRoots.every((element, index) => element === hydratedVectorRoots[index]),
  };
});
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

function expectedOutcomeProjection(expected) {
  const nodes = expected.nodes.map((node) => {
    const element = {};
    if (node.tag !== undefined) element.tag = node.tag;
    if (node.text !== undefined) element.text = node.text;
    if (node.classes !== undefined) element.classes = [...node.classes];
    if (node.attributes !== undefined) element.attributes = { ...node.attributes };
    if (node.properties !== undefined) element.properties = { ...node.properties };
    return {
      count: node.count,
      elements: Array.from({ length: node.count }, () => structuredClone(element)),
    };
  });
  const projection = { nodes };
  if (expected.relationships !== undefined) {
    projection.relationships = expected.relationships.map(() => true);
  }
  if (expected.events !== undefined) projection.events = [...expected.events];
  if (expected.focus !== undefined) projection.focus = true;
  return projection;
}

export function assertObservableOutcome(actual, expected, label = "observable vector") {
  assert.deepEqual(
    actual,
    expectedOutcomeProjection(expected),
    `${label} produced the wrong browser outcome`,
  );
}

export function observeBrowserDiagnostics(page) {
  const diagnostics = { consoleMessages: [], networkErrors: [], pageErrors: [] };
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      diagnostics.consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => diagnostics.pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    diagnostics.networkErrors.push(
      `${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "request failed"}`,
    );
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      diagnostics.networkErrors.push(`${response.status()} ${response.url()}`);
    }
  });
  return diagnostics;
}

export function assertNoBrowserDiagnostics(diagnostics, label = "packed browser") {
  const messages = [
    ...diagnostics.consoleMessages.map(({ type, text }) => `${label} console ${type}: ${text}`),
    ...diagnostics.pageErrors.map((message) => `${label} page error: ${message}`),
    ...diagnostics.networkErrors.map((message) => `${label} network error: ${message}`),
  ];
  assert.deepEqual(messages, [], messages.join("\n"));
}

async function observeOutcome(section, expected) {
  return section.evaluate((container, expectation) => {
    const normalizeText = (value) => (value ?? "").replace(/\s+/g, " ").trim();
    const nodes = expectation.nodes.map((node) => {
      const matches = [...container.querySelectorAll(node.selector)];
      return {
        count: matches.length,
        elements: matches.map((element) => {
          const observed = {};
          if (node.tag !== undefined) observed.tag = element.tagName.toLowerCase();
          if (node.text !== undefined) observed.text = normalizeText(element.textContent);
          if (node.classes !== undefined) {
            observed.classes = node.classes.filter((className) =>
              element.classList.contains(className),
            );
          }
          if (node.attributes !== undefined) {
            observed.attributes = Object.fromEntries(
              Object.entries(node.attributes).map(([name, value]) => {
                if (value === true) return [name, element.hasAttribute(name)];
                if (value === null) {
                  return [name, element.hasAttribute(name) ? element.getAttribute(name) : null];
                }
                return [name, element.getAttribute(name)];
              }),
            );
          }
          if (node.properties !== undefined) {
            observed.properties = Object.fromEntries(
              Object.keys(node.properties).map((name) => [name, element[name]]),
            );
          }
          return observed;
        }),
      };
    });
    const outcome = { nodes };
    if (expectation.relationships !== undefined) {
      outcome.relationships = expectation.relationships.map((relationship) => {
        const from = [...container.querySelectorAll(relationship.from)];
        const to = [...container.querySelectorAll(relationship.to)];
        if (from.length !== 1 || to.length !== 1) return false;
        const sourceValue = from[0].getAttribute(relationship.attribute);
        const targetValue = to[0].getAttribute(relationship.targetAttribute);
        return sourceValue !== null && sourceValue === targetValue;
      });
    }
    if (expectation.events !== undefined) {
      outcome.events = JSON.parse(container.getAttribute("data-events") ?? "[]");
    }
    if (expectation.focus !== undefined) {
      const matches = [...container.querySelectorAll(expectation.focus)];
      outcome.focus = matches.length === 1 && document.activeElement === matches[0];
    }
    return outcome;
  }, expected);
}

async function performBrowserAction(page, section, vector, action, path) {
  const locator = section.locator(action.selector);
  assert.equal(await locator.count(), 1, `${path} must match exactly one element`);
  let trustedEventType;

  if (action.type === "click") {
    const disabled = await locator.isDisabled();
    await locator.click({ force: disabled });
    trustedEventType = disabled ? "pointerdown" : "click";
  } else if (action.type === "type") {
    await locator.fill(action.value);
    trustedEventType = "input";
  } else {
    await locator.press(action.key);
    trustedEventType = "keydown";
  }

  await page.evaluate(() => new Promise((resolveFrame) => requestAnimationFrame(resolveFrame)));
  const trustedEvents = await page.evaluate(
    ({ key, type, vectorId }) =>
      (globalThis.__packedTrustedEvents ?? []).filter(
        (event) =>
          event.vector === vectorId &&
          event.type === type &&
          (key === undefined || event.key === key),
      ),
    {
      key: action.type === "press" ? action.key : undefined,
      type: trustedEventType,
      vectorId: vector.id,
    },
  );
  assert.ok(trustedEvents.length > 0, `${path} produced no browser input event`);
  assert.ok(
    trustedEvents.every(({ trusted }) => trusted),
    `${path} produced an untrusted event`,
  );
}

async function startStaticServer(root) {
  const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
  };
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", "http://packed-consumer.invalid");
      const pathname = decodeURIComponent(
        requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname,
      );
      const filePath = resolve(root, `.${pathname}`);
      if (!isWithin(filePath, root)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const extension = `.${filePath.split(".").pop()}`;
      const contents = await readFile(filePath);
      response.writeHead(200, {
        "content-type": contentTypes[extension] ?? "application/octet-stream",
      });
      response.end(contents);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object", "static server has no TCP address");
  return {
    close: () =>
      new Promise((resolveClose, rejectClose) => {
        server.close((error) => (error ? rejectClose(error) : resolveClose()));
        server.closeAllConnections();
      }),
    url: `http://127.0.0.1:${address.port}`,
  };
}

async function assertNoWorkspaceSourceLeakage(buildRoot, sourceRoot) {
  for (const file of await listFiles(buildRoot)) {
    const contents = await readFile(file);
    assert.ok(
      !contents.includes(sourceRoot),
      `built consumer asset leaked the workspace source path: ${relative(buildRoot, file)}`,
    );
  }
}

async function runBrowserConformance(consumerRoot) {
  let browser;
  let diagnostics;
  let page;
  let staticServer;
  const executed = [];

  try {
    staticServer = await startStaticServer(join(consumerRoot, "dist/client"));
    browser = await chromium.launch();
    const browserVersion = browser.version();
    page = await browser.newPage();
    diagnostics = observeBrowserDiagnostics(page);
    const response = await page.goto(staticServer.url, { waitUntil: "networkidle" });
    assert.ok(
      response?.ok(),
      `packed consumer navigation failed with ${response?.status() ?? "no response"}`,
    );
    await page.waitForFunction(() => globalThis.__packedHydration?.ready === true);
    await page.waitForTimeout(50);
    const hydration = await page.evaluate(() => globalThis.__packedHydration);
    assert.equal(
      hydration?.representativeRootPreserved,
      true,
      "representative SSR fixture root was replaced during hydration",
    );
    assert.equal(
      hydration?.vectorRootsPreserved,
      true,
      "one or more SSR vector roots were replaced during hydration",
    );

    for (const contract of observableContracts) {
      for (const vector of contract.vectors) {
        const path = `${contract.component}/${vector.id}`;
        const section = page.locator(
          `section[data-component="${contract.component}"][data-vector="${vector.id}"]`,
        );
        assert.equal(await section.count(), 1, `${path} fixture root must exist exactly once`);
        for (const [index, action] of (vector.actions ?? []).entries()) {
          await performBrowserAction(page, section, vector, action, `${path}.actions[${index}]`);
        }
        assertObservableOutcome(
          await observeOutcome(section, vector.expected),
          vector.expected,
          path,
        );
        executed.push(path);
      }
    }

    assert.equal(executed.length, 6, "packed browser did not execute every pilot vector");
    await page.waitForTimeout(50);
    assertNoBrowserDiagnostics(diagnostics);
    return { browserVersion, executed };
  } catch (error) {
    let diagnosticError;
    if (diagnostics) {
      try {
        assertNoBrowserDiagnostics(diagnostics);
      } catch (candidate) {
        diagnosticError = candidate;
      }
    }
    if (diagnosticError && diagnosticError.message !== error.message) {
      throw new Error(`${error.message}\n${diagnosticError.message}`, { cause: error });
    }
    throw error;
  } finally {
    await page?.close().catch(() => {});
    await browser?.close().catch(() => {});
    await staticServer?.close().catch(() => {});
  }
}

async function main() {
  let temporaryRoot;
  let primaryError;

  try {
    temporaryRoot = await mkdtemp(join(tmpdir(), "kumo-svelte-packed-consumer-"));
    const packRoot = join(temporaryRoot, "pack");
    const consumerRoot = join(temporaryRoot, "consumer");
    let browserResult;
    let concreteExportTargetCount;
    let packageFiles;
    let sourcePackageJson;
    let ssrHtml;
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
      concreteExportTargetCount = inspectExportMap(sourcePackageJson, packageFiles);
      assert.deepEqual(
        observableContracts.map(({ component }) => component),
        ["button", "input", "collapsible"],
        "packed browser pilot component families changed",
      );
      assert.equal(
        observableContracts.reduce((total, contract) => total + contract.vectors.length, 0),
        6,
        "packed browser pilot vector count changed",
      );
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
      assert.deepEqual(installedPackageJson.exports, sourcePackageJson.exports);
      assert.equal(inspectExportMap(installedPackageJson, packageFiles), concreteExportTargetCount);

      const resolutionScript = `
        import assert from "node:assert/strict";
        import { realpathSync } from "node:fs";
        import { relative, isAbsolute, sep } from "node:path";
        import { fileURLToPath } from "node:url";

        const consumerRoot = ${JSON.stringify(consumerRoot)};
        const sourceRoot = ${JSON.stringify(await realpath(packageRoot))};
        const expected = ${JSON.stringify({
          "kumo-svelte/components/button": "src/components/button/index.ts",
          "kumo-svelte/components/collapsible": "src/components/collapsible/index.ts",
          "kumo-svelte/components/input": "src/components/input/index.ts",
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
      await assertNoWorkspaceSourceLeakage(
        join(consumerRoot, "dist/client"),
        await realpath(packageRoot),
      );
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

      ssrHtml = await serverModule.renderApp();
      assert.ok(
        ssrHtml.includes('data-conformance="packed-package"'),
        "SSR output lost its marker",
      );
      for (const contract of observableContracts) {
        for (const vector of contract.vectors) {
          assert.ok(
            ssrHtml.includes(`data-vector="${vector.id}"`),
            `SSR output omitted ${contract.component}/${vector.id}`,
          );
        }
      }
      await assertNoWorkspaceSourceLeakage(
        join(consumerRoot, "dist/server"),
        await realpath(packageRoot),
      );

      const indexPath = join(consumerRoot, "dist/client/index.html");
      const clientDocument = await readFile(indexPath, "utf8");
      const emptyTarget = '<div id="app"></div>';
      assert.ok(
        clientDocument.includes(emptyTarget),
        "client document has no empty hydration target",
      );
      await writeFile(
        indexPath,
        clientDocument.replace(emptyTarget, () => `<div id="app">${ssrHtml}</div>`),
      );
    });

    await phase("Chromium hydration/interactions", async () => {
      browserResult = await runBrowserConformance(consumerRoot);
    });

    const totalDuration = phaseTimings.reduce((total, { duration }) => total + duration, 0);
    console.log(
      `Packed-package consumer conformance passed (${formatDuration(totalDuration)} total).`,
    );
    console.log(
      `Inspected ${concreteExportTargetCount} concrete export-map targets and ran ${browserResult.executed.length} vectors in Chromium ${browserResult.browserVersion}.`,
    );
    console.log(`Pilot vectors: ${browserResult.executed.join(", ")}.`);
    console.log(
      "Scope: these three pilot families are not package-wide parity, visual parity, accessibility certification, or a readiness score.",
    );
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

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
