#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, lstat, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { chromium } from "playwright";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const frameworkNames = ["react", "svelte"];
const actionTypes = new Set(["click", "fill", "focus", "hover", "press", "wait"]);
const observationKinds = new Set(["aria", "attribute", "html", "property", "text"]);

function fail(message) {
  throw new Error(message);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function frameworkValue(value, framework) {
  return isObject(value) && ("react" in value || "svelte" in value) ? value[framework] : value;
}

function requireString(value, path) {
  if (typeof value !== "string" || value.length === 0) fail(`${path} must be a non-empty string`);
}

function requireSelector(value, path) {
  if (typeof value === "string") return requireString(value, path);
  if (!isObject(value)) fail(`${path} must be a string or framework map`);
  for (const framework of frameworkNames) requireString(value[framework], `${path}.${framework}`);
}

export function validateConfig(config) {
  if (!isObject(config)) fail("config must be a JSON object");
  requireString(config.id, "id");
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(config.id)) {
    fail("id may contain only lowercase letters, numbers, dots, underscores, and hyphens");
  }
  for (const key of ["package", "version", "tag", "commit"]) {
    requireString(config.release?.[key], `release.${key}`);
  }
  if (!/^[0-9a-f]{40}$/.test(config.release.commit)) {
    fail("release.commit must be an exact 40-character Git SHA");
  }
  requireString(config.feature?.source, "feature.source");
  requireString(config.feature?.includedInRelease, "feature.includedInRelease");
  requireString(config.localBaseSha, "localBaseSha");
  if (!/^[0-9a-f]{40}$/.test(config.localBaseSha)) {
    fail("localBaseSha must be an exact 40-character Git SHA");
  }
  if (!Array.isArray(config.integrationPaths) || config.integrationPaths.length === 0) {
    fail("integrationPaths must contain at least one product path");
  }
  for (const [name] of Object.entries(config.requestHeaders ?? {})) {
    if (/^(authorization|cookie|proxy-authorization|x-api-key)$/i.test(name)) {
      fail(`requestHeaders.${name} is credential-bearing and cannot be preserved safely`);
    }
  }
  for (const framework of frameworkNames) {
    const endpoint = config.frameworks?.[framework];
    if (!isObject(endpoint) || Boolean(endpoint.url) === Boolean(endpoint.portal)) {
      fail(`frameworks.${framework} must define exactly one of url or portal`);
    }
    if (endpoint.portal) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(endpoint.portal)) {
        fail(`frameworks.${framework}.portal is not a valid service name`);
      }
    } else {
      let parsed;
      try {
        parsed = new URL(endpoint.url);
      } catch {
        fail(`frameworks.${framework}.url is invalid`);
      }
      if (!["http:", "https:"].includes(parsed.protocol)) {
        fail(`frameworks.${framework}.url must use HTTP or HTTPS`);
      }
    }
  }
  if (!Array.isArray(config.scenarios) || config.scenarios.length === 0) {
    fail("scenarios must contain at least one scenario");
  }
  const ids = new Set();
  for (const [index, scenario] of config.scenarios.entries()) {
    const base = `scenarios[${index}]`;
    requireString(scenario.id, `${base}.id`);
    if (!/^[a-z0-9][a-z0-9._-]*$/.test(scenario.id)) fail(`${base}.id is not file-safe`);
    if (ids.has(scenario.id)) fail(`${base}.id duplicates ${scenario.id}`);
    ids.add(scenario.id);
    requireSelector(scenario.path, `${base}.path`);
    if (scenario.captureSelector)
      requireSelector(scenario.captureSelector, `${base}.captureSelector`);
    for (const field of ["allowRedirects", "fullPage", "recordVideo"]) {
      if (field in scenario && typeof scenario[field] !== "boolean") {
        fail(`${base}.${field} must be a boolean`);
      }
    }
    for (const field of ["settleMs", "deviceScaleFactor"]) {
      if (field in scenario && (typeof scenario[field] !== "number" || scenario[field] < 0)) {
        fail(`${base}.${field} must be a non-negative number`);
      }
    }
    for (const [actionIndex, action] of (scenario.actions ?? []).entries()) {
      if (!actionTypes.has(action.type))
        fail(`${base}.actions[${actionIndex}].type is unsupported`);
      if (action.type !== "wait" && !action.selector) {
        fail(`${base}.actions[${actionIndex}].selector is required`);
      }
      if (action.type !== "wait") {
        requireSelector(action.selector, `${base}.actions[${actionIndex}].selector`);
      }
      if (action.type === "fill" && typeof action.value !== "string") {
        fail(`${base}.actions[${actionIndex}].value must be a string`);
      }
      if (action.type === "press") requireString(action.key, `${base}.actions[${actionIndex}].key`);
      for (const field of action.type === "wait" ? ["ms"] : ["afterMs"]) {
        if (field in action && (typeof action[field] !== "number" || action[field] < 0)) {
          fail(`${base}.actions[${actionIndex}].${field} must be a non-negative number`);
        }
      }
    }
    for (const [observationIndex, observation] of (scenario.observations ?? []).entries()) {
      const observationBase = `${base}.observations[${observationIndex}]`;
      requireString(observation.id, `${observationBase}.id`);
      requireSelector(observation.selector, `${observationBase}.selector`);
      if (!observationKinds.has(observation.kind)) fail(`${observationBase}.kind is unsupported`);
      if (["attribute", "property"].includes(observation.kind)) {
        requireString(observation.name, `${observationBase}.name`);
      }
      if ("expected" in observation === "expectedByFramework" in observation) {
        fail(`${observationBase} must define exactly one of expected or expectedByFramework`);
      }
      if ("expectedByFramework" in observation) {
        if (!isObject(observation.expectedByFramework)) {
          fail(`${observationBase}.expectedByFramework must be a framework map`);
        }
        for (const framework of frameworkNames) {
          if (!(framework in observation.expectedByFramework)) {
            fail(`${observationBase}.expectedByFramework.${framework} is required`);
          }
        }
      }
    }
  }
  return config;
}

function parseArguments(argv) {
  const args = { config: ".amp/parity-proof.json", dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--dry-run") args.dryRun = true;
    else if (argv[index] === "--config") args.config = argv[++index];
    else fail(`unknown argument: ${argv[index]}`);
  }
  if (!args.config) fail("--config requires a path");
  return args;
}

async function sha256File(path) {
  return createHash("sha256")
    .update(await readFile(path))
    .digest("hex");
}

function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function git(args, cwd = repoRoot) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

async function hashFixtures(paths = []) {
  const files = [];
  async function visit(path) {
    const details = await lstat(path);
    if (details.isSymbolicLink())
      fail(`provenance path cannot be a symlink: ${relative(repoRoot, path)}`);
    if (details.isDirectory()) {
      const entries = await readdir(path);
      for (const entry of entries.sort()) await visit(join(path, entry));
    } else {
      files.push({ path: relative(repoRoot, path), sha256: await sha256File(path) });
    }
  }
  for (const configuredPath of [...paths].sort()) {
    const path = resolve(repoRoot, configuredPath);
    if (path !== repoRoot && !path.startsWith(`${repoRoot}/`)) {
      fail(`provenance path escapes the repository: ${configuredPath}`);
    }
    await visit(path);
  }
  return files;
}

async function snapshotInputs(config, configBytes) {
  git(["cat-file", "-e", `${config.localBaseSha}^{commit}`]);
  const trackedDiff = git([
    "diff",
    "--binary",
    config.localBaseSha,
    "--",
    ...config.integrationPaths,
  ]);
  return {
    localBaseSha: config.localBaseSha,
    localHeadSha: git(["rev-parse", "HEAD"]),
    config: { sha256: sha256Text(configBytes) },
    fixtures: await hashFixtures(config.fixturePaths),
    integrationFiles: await hashFixtures(config.integrationPaths),
    trackedIntegrationDiffSha256: sha256Text(trackedDiff),
  };
}

function verifyRelease(config) {
  if (config.frameworks.react.portal !== "kumo-react-docs") {
    return {
      status: "unverified",
      declaredCommit: config.release.commit,
      detail: "The explicit React URL does not expose machine-verifiable release ancestry.",
    };
  }
  const checkout = resolve(repoRoot, ".amp/upstream/kumo");
  const observedCommit = git(["rev-parse", "HEAD"], checkout);
  if (observedCommit !== config.release.commit) {
    fail(
      `managed React checkout is ${observedCommit}, expected release.commit ${config.release.commit}`,
    );
  }
  return { status: "verified", declaredCommit: config.release.commit, observedCommit };
}

async function resolveEndpoint(endpoint) {
  let value;
  if (endpoint.url) value = endpoint.url;
  else {
    const portalPath = resolve(repoRoot, ".amp/portals", `${endpoint.portal}.json`);
    const portal = JSON.parse(await readFile(portalPath, "utf8"));
    value = portal.links?.[0]?.url;
    if (!value) fail(`portal ${endpoint.portal} has no URL in ${relative(repoRoot, portalPath)}`);
  }
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    fail(`framework endpoint must be an HTTP(S) URL without credentials: ${value}`);
  }
  return url.href.replace(/\/$/, "");
}

export function scenarioUrl(baseUrl, configuredPath, framework) {
  const path = frameworkValue(configuredPath, framework);
  requireString(path, `scenario path for ${framework}`);
  const endpoint = new URL(`${baseUrl}/`);
  const url = new URL(path, endpoint);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    fail(`scenario path for ${framework} must produce an HTTP(S) URL without credentials`);
  }
  if (url.origin !== endpoint.origin) {
    fail(`scenario path for ${framework} escapes configured origin ${endpoint.origin}`);
  }
  return url.href;
}

async function waitForStablePage(page, selector, settleMs) {
  await page.locator(selector).first().waitFor({ state: "visible" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(settleMs);
}

async function performAction(page, action, framework) {
  if (action.type === "wait") {
    await page.waitForTimeout(action.ms ?? 250);
    return;
  }
  const selector = frameworkValue(action.selector, framework);
  requireString(selector, `${action.type} selector for ${framework}`);
  const locator = page.locator(selector).first();
  if (action.type === "click") await locator.click();
  if (action.type === "fill") await locator.fill(action.value);
  if (action.type === "focus") await locator.focus();
  if (action.type === "hover") await locator.hover();
  if (action.type === "press") await locator.press(action.key);
  if (action.afterMs) await page.waitForTimeout(action.afterMs);
}

async function observe(page, observation, framework) {
  const selector = frameworkValue(observation.selector, framework);
  const locator = page.locator(selector).first();
  if (observation.kind === "aria") return locator.ariaSnapshot();
  if (observation.kind === "attribute") return locator.getAttribute(observation.name);
  if (observation.kind === "html") return locator.evaluate((element) => element.outerHTML);
  if (observation.kind === "property") {
    return locator.evaluate((element, name) => element[name], observation.name);
  }
  return locator.textContent();
}

function equal(actual, expected) {
  return isDeepStrictEqual(actual, expected);
}

async function navigationChain(response) {
  const chain = [];
  let request = response.request();
  while (request) {
    const requestResponse = await request.response();
    chain.unshift({ url: request.url(), status: requestResponse?.status() ?? null });
    request = request.redirectedFrom();
  }
  return chain;
}

async function captureFramework({ browser, config, scenario, framework, baseUrl, outputDir }) {
  const viewport = scenario.viewport ?? { width: 1280, height: 720 };
  const scenarioDir = join(outputDir, scenario.id);
  const videoDir = join(scenarioDir, `.video-${framework}`);
  const recordVideo = scenario.recordVideo === true;
  await mkdir(scenarioDir, { recursive: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: scenario.deviceScaleFactor ?? 1,
    colorScheme: scenario.colorScheme ?? "light",
    reducedMotion: scenario.reducedMotion ?? "no-preference",
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: config.requestHeaders ?? {},
    ...(recordVideo ? { recordVideo: { dir: videoDir, size: viewport } } : {}),
  });
  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const url = scenarioUrl(baseUrl, scenario.path, framework);
  const ssrPath = join(scenarioDir, `${framework}-ssr.html`);
  const screenshotPath = join(scenarioDir, `${framework}.png`);

  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: config.timeoutMs ?? 30_000,
    });
    if (!response) fail("navigation produced no document response");
    if (!response.ok()) fail(`navigation returned ${response.status()} for ${url}`);
    const responseUrl = response.url();
    const redirects = await navigationChain(response);
    if (redirects.length > 1 && scenario.allowRedirects !== true) {
      fail(
        `unexpected redirect chain ${redirects.map((entry) => entry.url).join(" -> ")}; set allowRedirects only when intentional`,
      );
    }
    const ssrHtml = await response.text();
    await writeFile(ssrPath, ssrHtml);
    const initialPageUrl = page.url();
    const captureSelector = frameworkValue(scenario.captureSelector ?? "body", framework);
    await waitForStablePage(page, captureSelector, scenario.settleMs ?? 250);
    for (const action of scenario.actions ?? []) await performAction(page, action, framework);
    await waitForStablePage(page, captureSelector, scenario.settleMs ?? 250);

    const observations = [];
    for (const observation of scenario.observations ?? []) {
      const actual = await observe(page, observation, framework);
      if (actual === undefined) {
        fail(
          `observation ${observation.id} returned undefined; use a serializable observable value`,
        );
      }
      const expected = observation.expectedByFramework
        ? observation.expectedByFramework[framework]
        : observation.expected;
      observations.push({
        id: observation.id,
        kind: observation.kind,
        expected,
        actual,
        pass: equal(actual, expected),
      });
    }
    const locator = page.locator(captureSelector).first();
    await (scenario.fullPage ? page : locator).screenshot({
      path: screenshotPath,
      animations: "disabled",
      ...(scenario.fullPage ? { fullPage: true } : {}),
    });
    const hydratedDom = await locator.evaluate((element) => element.outerHTML);
    const accessibility = await locator.ariaSnapshot();
    const finalPageUrl = page.url();
    const video = page.video();
    await context.close();
    let videoPath = null;
    if (video) {
      videoPath = join(scenarioDir, `${framework}.webm`);
      await rename(await video.path(), videoPath);
      await rm(videoDir, { recursive: true, force: true });
    }
    return {
      framework,
      requestedUrl: url,
      responseUrl,
      initialPageUrl,
      finalPageUrl,
      redirects,
      httpStatus: response.status(),
      ssr: { path: relative(outputDir, ssrPath), sha256: await sha256File(ssrPath) },
      screenshot: {
        path: relative(outputDir, screenshotPath),
        sha256: await sha256File(screenshotPath),
      },
      video: videoPath
        ? { path: relative(outputDir, videoPath), sha256: await sha256File(videoPath) }
        : null,
      hydratedDom,
      accessibility,
      observations,
      consoleMessages,
      pageErrors,
    };
  } catch (error) {
    await context.close().catch(() => {});
    fail(`${scenario.id}/${framework}: ${error.message}`);
  }
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
}

function renderIndex(evidence) {
  const scenarios = evidence.scenarios
    .map((scenario) => {
      const [react, svelte] = frameworkNames.map((name) => scenario.frameworks[name]);
      const assertionCount = react.observations.length + svelte.observations.length;
      const videos = react.video
        ? `<div class="pair"><figure><video controls src="${escapeHtml(react.video.path)}"></video><figcaption>React interaction</figcaption></figure><figure><video controls src="${escapeHtml(svelte.video.path)}"></video><figcaption>Svelte interaction</figcaption></figure></div>`
        : "";
      return `<section><h2>${escapeHtml(scenario.id)}</h2><p>Automated checks: <strong>${scenario.automatedChecks}</strong> (${assertionCount} assertions). Visual inspection: <strong>required</strong>.</p><div class="pair"><figure><img src="${escapeHtml(react.screenshot.path)}"><figcaption>React</figcaption></figure><figure><img src="${escapeHtml(svelte.screenshot.path)}"><figcaption>Svelte</figcaption></figure></div>${videos}</section>`;
    })
    .join("\n");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(evidence.proofId)} parity evidence</title><style>body{font:16px system-ui;margin:2rem;color:#222}header{max-width:75ch}.warning{padding:1rem;background:#fff3cd;border:1px solid #e5c35b}.pair{display:grid;grid-template-columns:1fr 1fr;gap:1rem}figure{margin:0;min-width:0}img,video{width:100%;border:1px solid #bbb}figcaption{font-weight:700;margin-top:.4rem}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style></head><body><header><h1>${escapeHtml(evidence.proofId)}</h1><p class="warning"><strong>Not a parity verdict.</strong> Capture completed and automated checks are shown below. A reviewer must inspect every final image/video and explain discrepancies before recommending integration.</p><p><a href="evidence.json">Machine-readable evidence and provenance</a> · <a href="capture-config.json">Exact capture config</a> · <a href="review-template.json">Human review template</a></p></header>${scenarios}</body></html>\n`;
}

function generatedAt() {
  return process.env.SOURCE_DATE_EPOCH
    ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toISOString()
    : new Date().toISOString();
}

export async function run(config, { configPath, outputRoot, dryRun = false } = {}) {
  validateConfig(config);
  const resolvedConfigPath = resolve(repoRoot, configPath ?? ".amp/parity-proof.json");
  const resolvedOutputRoot = resolve(repoRoot, outputRoot ?? ".amp/in/artifacts/parity");
  const outputDir = join(resolvedOutputRoot, config.id);
  const releaseVerification = verifyRelease(config);
  const endpoints = Object.fromEntries(
    await Promise.all(
      frameworkNames.map(async (name) => [name, await resolveEndpoint(config.frameworks[name])]),
    ),
  );
  const plan = {
    proofId: config.id,
    outputDirectory: relative(repoRoot, outputDir),
    endpoints,
    requestHeaders: config.requestHeaders ?? {},
    scenarios: config.scenarios.map((scenario) => ({
      id: scenario.id,
      viewport: scenario.viewport ?? { width: 1280, height: 720 },
      deviceScaleFactor: scenario.deviceScaleFactor ?? 1,
      colorScheme: scenario.colorScheme ?? "light",
      reducedMotion: scenario.reducedMotion ?? "no-preference",
      settleMs: scenario.settleMs ?? 250,
      timeoutMs: config.timeoutMs ?? 30_000,
      fullPage: scenario.fullPage === true,
      allowRedirects: scenario.allowRedirects === true,
      recordVideo: scenario.recordVideo === true,
      captureSelectors: Object.fromEntries(
        frameworkNames.map((name) => [
          name,
          frameworkValue(scenario.captureSelector ?? "body", name),
        ]),
      ),
      actions: (scenario.actions ?? []).map((action) => ({
        ...action,
        ...(action.type === "wait" ? { ms: action.ms ?? 250 } : {}),
        ...(action.selector
          ? {
              selectors: Object.fromEntries(
                frameworkNames.map((name) => [name, frameworkValue(action.selector, name)]),
              ),
              selector: undefined,
            }
          : {}),
      })),
      observations: (scenario.observations ?? []).map((observation) => ({
        id: observation.id,
        kind: observation.kind,
        name: observation.name,
        selectors: Object.fromEntries(
          frameworkNames.map((name) => [name, frameworkValue(observation.selector, name)]),
        ),
        expected: observation.expected,
        expectedByFramework: observation.expectedByFramework,
      })),
      urls: Object.fromEntries(
        frameworkNames.map((name) => [name, scenarioUrl(endpoints[name], scenario.path, name)]),
      ),
    })),
  };
  if (dryRun) return { ...plan, releaseVerification };

  const configBytes = await readFile(resolvedConfigPath);
  const inputSnapshot = await snapshotInputs(config, configBytes);
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  const captureConfigPath = join(outputDir, "capture-config.json");
  await writeFile(captureConfigPath, `${JSON.stringify(config, null, 2)}\n`);
  const browser = await chromium.launch();
  const browserVersion = browser.version();
  const scenarios = [];
  try {
    for (const scenario of config.scenarios) {
      const captures = {};
      for (const framework of frameworkNames) {
        captures[framework] = await captureFramework({
          browser,
          config,
          scenario,
          framework,
          baseUrl: endpoints[framework],
          outputDir,
        });
      }
      const failedAssertions = frameworkNames.flatMap((name) =>
        captures[name].observations
          .filter((observation) => !observation.pass)
          .map((observation) => `${name}:${observation.id}`),
      );
      const runtimeErrors = frameworkNames.flatMap((name) => [
        ...captures[name].consoleMessages
          .filter((message) => message.type === "error")
          .map((message) => `${name}:console:${message.type}:${message.text}`),
        ...captures[name].pageErrors.map((message) => `${name}:pageerror:${message}`),
      ]);
      scenarios.push({
        id: scenario.id,
        conditions: plan.scenarios.find((item) => item.id === scenario.id),
        automatedChecks:
          failedAssertions.length > 0 || runtimeErrors.length > 0
            ? "failed"
            : (scenario.observations ?? []).length === 0
              ? "not-configured"
              : "passed",
        failedAssertions,
        runtimeErrors,
        frameworks: captures,
        visualInspection: { status: "required", verdict: null, discrepancies: [] },
      });
    }
  } finally {
    await browser.close();
  }

  const finalConfigBytes = await readFile(resolvedConfigPath);
  const finalInputSnapshot = await snapshotInputs(config, finalConfigBytes);
  if (!isDeepStrictEqual(inputSnapshot, finalInputSnapshot)) {
    fail(
      "config, fixtures, integration files, or Git state changed during capture; discard evidence and rerun",
    );
  }
  const scenarioStatuses = scenarios.map((scenario) => scenario.automatedChecks);
  const automatedChecks = scenarioStatuses.includes("failed")
    ? "failed"
    : scenarioStatuses.includes("not-configured")
      ? "incomplete"
      : "passed";
  const evidence = {
    schemaVersion: 1,
    proofId: config.id,
    generatedAt: generatedAt(),
    status:
      releaseVerification.status === "verified"
        ? "awaiting-human-review"
        : "release-provenance-unverified",
    automatedChecks,
    parityVerdict: null,
    readyToRecommend: false,
    release: config.release,
    releaseVerification,
    feature: config.feature,
    provenance: {
      ...inputSnapshot,
      config: {
        path: relative(repoRoot, resolvedConfigPath),
        sha256: inputSnapshot.config.sha256,
        capturedPath: relative(outputDir, captureConfigPath),
        capturedSha256: await sha256File(captureConfigPath),
      },
      runtime: {
        node: process.version,
        platform: `${process.platform}-${process.arch}`,
        playwright: "1.57.0",
        chromium: browserVersion,
      },
    },
    scenarios,
    reviewInstructions: [
      "Inspect every final React/Svelte image pair and WEBM pair.",
      "Record visual verdicts and classify every discrepancy.",
      "Do not infer parity or ship readiness from capture or automated checks alone.",
    ],
  };
  await writeFile(join(outputDir, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
  await writeFile(
    join(outputDir, "review-template.json"),
    `${JSON.stringify(
      {
        proofId: config.id,
        evidenceSha256: await sha256File(join(outputDir, "evidence.json")),
        reviewer: null,
        reviewedAt: null,
        scenarios: scenarios.map(({ id }) => ({
          id,
          visualVerdict: null,
          interactionVerdict: null,
          discrepancies: [],
        })),
        overallVerdict: null,
        readyToRecommend: false,
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(join(outputDir, "index.html"), renderIndex(evidence));
  return { plan, evidence, outputDir };
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  const configPath = isAbsolute(args.config) ? args.config : resolve(repoRoot, args.config);
  await access(configPath).catch(() => fail(`config not found: ${relative(repoRoot, configPath)}`));
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const result = await run(config, { configPath, dryRun: args.dryRun });
  if (args.dryRun) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`Parity evidence captured: ${relative(repoRoot, result.outputDir)}/index.html`);
  console.log(`Automated checks: ${result.evidence.automatedChecks}`);
  console.log("Human visual inspection: REQUIRED — no parity or ship verdict was generated.");
  if (
    result.evidence.automatedChecks !== "passed" ||
    result.evidence.releaseVerification.status !== "verified"
  ) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`Parity proof failed: ${error.message}`);
    process.exit(1);
  });
}
