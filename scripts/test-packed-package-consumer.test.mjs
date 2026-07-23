import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";
import { observableContracts } from "../packages/kumo-svelte/tests/observable/contracts.ts";
import {
  assertNoBrowserDiagnostics,
  assertObservableOutcome,
  observeBrowserDiagnostics,
} from "./test-packed-package-consumer.mjs";

test("packed browser assertions reject a wrong expected outcome", () => {
  const expected = structuredClone(observableContracts[0].vectors[0].expected);
  const actual = {
    events: ["click"],
    focus: true,
    nodes: [
      {
        count: 1,
        elements: [
          {
            attributes: {
              "data-shape": "base",
              "data-size": "base",
              "data-variant": "primary",
              disabled: null,
              type: "button",
            },
            classes: ["bg-kumo-brand", "h-9"],
            tag: "button",
            text: "Save changes",
          },
        ],
      },
    ],
  };
  assert.doesNotThrow(() => assertObservableOutcome(actual, expected, "calibration"));

  expected.nodes[0].text = "Wrong expected outcome";
  assert.throws(
    () => assertObservableOutcome(actual, expected, "calibration"),
    /calibration produced the wrong browser outcome/,
  );
});

test("packed browser gate rejects hydration, console, and page diagnostics", async (context) => {
  const browser = await chromium.launch();
  context.after(() => browser.close());
  const page = await browser.newPage();
  const diagnostics = observeBrowserDiagnostics(page);

  await page.setContent(`<script>
    console.warn("hydration_mismatch calibration");
    console.error("console error calibration");
    queueMicrotask(() => { throw new Error("page error calibration"); });
  </script>`);
  await page.waitForTimeout(50);

  assert.throws(
    () => assertNoBrowserDiagnostics(diagnostics, "calibration"),
    (error) => {
      assert.match(error.message, /console warning: hydration_mismatch calibration/);
      assert.match(error.message, /console error: console error calibration/);
      assert.match(error.message, /page error: page error calibration/);
      return true;
    },
  );
});
