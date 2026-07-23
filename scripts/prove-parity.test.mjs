import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { run, scenarioUrl, validateConfig } from "./prove-parity.mjs";

function config(overrides = {}) {
  return {
    id: "button-disabled",
    release: {
      package: "@cloudflare/kumo",
      version: "2.8.0",
      tag: "@cloudflare/kumo@2.8.0",
      commit: "d4ab7bafc9d1e33deb19cbfe6b52c4e0dec8b7ff",
    },
    feature: {
      source: "packages/kumo/src/components/button",
      includedInRelease: "Present at the exact release commit",
    },
    localBaseSha: "8ebcac11b93c7e13579786e7e2ae49bece7839ae",
    integrationPaths: ["scripts/prove-parity.mjs"],
    frameworks: {
      react: { url: "https://react.example.test" },
      svelte: { url: "https://svelte.example.test" },
    },
    scenarios: [
      {
        id: "desktop-light",
        path: { react: "/components/button", svelte: "/components/button" },
        captureSelector: "main",
        observations: [
          { id: "disabled", selector: "button", kind: "attribute", name: "disabled", expected: "" },
        ],
      },
    ],
    ...overrides,
  };
}

test("validates an explicit release-bounded config", () => {
  assert.equal(validateConfig(config()).release.version, "2.8.0");
});

test("rejects observations without expected values", () => {
  const invalid = config();
  delete invalid.scenarios[0].observations[0].expected;
  assert.throws(() => validateConfig(invalid), /exactly one of expected or expectedByFramework/);
});

test("rejects incomplete framework-specific expectations", () => {
  const invalid = config();
  delete invalid.scenarios[0].observations[0].expected;
  invalid.scenarios[0].observations[0].expectedByFramework = { react: "" };
  assert.throws(() => validateConfig(invalid), /expectedByFramework.svelte is required/);
});

test("rejects scenario paths outside the configured origin", () => {
  assert.throws(
    () => scenarioUrl("https://react.example.test", "https://other.example.test/button", "react"),
    /escapes configured origin/,
  );
  assert.throws(
    () => scenarioUrl("https://react.example.test", "//other.example.test/button", "react"),
    /escapes configured origin/,
  );
  assert.throws(
    () => scenarioUrl("https://react.example.test", "file:///tmp/button", "react"),
    /must produce an HTTP\(S\) URL/,
  );
  assert.throws(
    () =>
      scenarioUrl("https://react.example.test", "https://user@react.example.test/button", "react"),
    /without credentials/,
  );
});

test("rejects truthy strings for capture booleans", () => {
  const invalid = config();
  invalid.scenarios[0].fullPage = "false";
  assert.throws(() => validateConfig(invalid), /fullPage must be a boolean/);
});

test("dry run resolves matched URLs and conditions without launching a browser", async () => {
  const directory = await mkdtemp(join(tmpdir(), "kumo-parity-"));
  await mkdir(join(directory, "artifacts"));
  await writeFile(join(directory, "config.json"), JSON.stringify(config()));
  const plan = await run(config(), {
    configPath: join(directory, "config.json"),
    outputRoot: join(directory, "artifacts"),
    dryRun: true,
  });
  assert.deepEqual(plan.scenarios[0].viewport, { width: 1280, height: 720 });
  assert.equal(plan.scenarios[0].urls.react, "https://react.example.test/components/button");
  assert.equal(plan.scenarios[0].urls.svelte, "https://svelte.example.test/components/button");
  assert.equal(plan.scenarios[0].recordVideo, false);
});
