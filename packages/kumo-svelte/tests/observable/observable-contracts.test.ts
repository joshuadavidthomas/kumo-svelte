// @vitest-environment happy-dom

import { describe, expect, it } from "vitest";
import { observableContracts } from "./contracts";
import { runObservableContracts, validateObservableContracts } from "./harness";

describe("package-owned observable contracts", () => {
  it("executes every declared Svelte regression vector", async () => {
    const receipt = await runObservableContracts(observableContracts);

    expect(receipt).toEqual({
      declared: 6,
      executed: 6,
      scope: "local-svelte-regression",
    });
  });

  it("rejects an empty contract set and empty vectors", () => {
    expect(() => validateObservableContracts([])).toThrow("expected at least one contract");
    expect(() =>
      validateObservableContracts([
        {
          component: "button",
          schemaVersion: "kumo-svelte.observable/v1",
          scope: "local-svelte-regression",
          vectors: [],
        },
      ]),
    ).toThrow("expected at least one vector");
  });

  it("rejects an incomplete keyboard action", () => {
    const malformed = structuredClone(observableContracts);
    const action = malformed[0].vectors[1].actions?.[0];
    if (!action) throw new Error("keyboard calibration action is missing");
    delete (action as { key?: string }).key;

    expect(() => validateObservableContracts(malformed)).toThrow('missing required field "key"');
  });

  it("rejects unknown schema fields", () => {
    const malformed = structuredClone(observableContracts);
    Object.assign(malformed[0], { verdict: "parity-proven" });

    expect(() => validateObservableContracts(malformed)).toThrow('unknown field "verdict"');
  });

  it("rejects inert per-node expectations on an absence assertion", () => {
    const malformed = structuredClone(observableContracts);
    malformed[0].vectors[0].expected.nodes[0].count = 0;

    expect(() => validateObservableContracts(malformed)).toThrow(
      "count 0 cannot include per-node expectations",
    );
  });

  it("detects an incorrect observable expectation", async () => {
    const incorrect = structuredClone(observableContracts);
    incorrect[0].vectors[0].expected.nodes[0].text = "Incorrect label";

    await expect(runObservableContracts([incorrect[0]])).rejects.toThrow(
      'expected text "Incorrect label", observed "Save changes"',
    );
  });
});
