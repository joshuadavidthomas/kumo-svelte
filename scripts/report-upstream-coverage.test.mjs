import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CoverageReportError,
  assertVersionAuthority,
  classifyCoverage,
  compareReleases,
  parseDeclaredExports,
  parseLockfileKumo,
  parseManagedCheckoutVersion,
  readFamilyInventory,
  validateMappings,
} from "./report-upstream-coverage.mjs";

const emptyMappings = {
  schemaVersion: 2,
  reviewedUpstreamVersion: "2.8.0",
  familyMappings: [],
  intentionalUpstreamFamilies: [],
  intentionalLocalFamilies: [],
  reviewedUpstreamExports: [],
};

function family(name, declarations) {
  return { declarations, exportPath: `./components/${name}`, family: name };
}

function review(overrides = {}) {
  return {
    category: "actual-missing-capability",
    export: "Missing",
    family: "example",
    local: [],
    reason: "Source review found no local public capability for this declaration.",
    sources: {
      upstream: ["packages/kumo/src/components/example/index.ts"],
      local: ["packages/kumo-svelte/src/components/example/index.ts"],
    },
    ...overrides,
  };
}

describe("declaration and lockfile parsing", () => {
  it("collects named, declared, default, and recursive export-all names deterministically", () => {
    const directory = mkdtempSync(join(tmpdir(), "kumo-coverage-"));
    writeFileSync(
      join(directory, "shared.d.ts"),
      "export declare const Zebra: string;\nexport interface Alpha {}\n",
    );
    writeFileSync(
      join(directory, "index.d.ts"),
      'export { Button, type ButtonProps } from "./button";\nexport * from "./shared";\nexport default function Example(): void;\n',
    );

    assert.deepEqual(parseDeclaredExports(join(directory, "index.d.ts")), [
      "Alpha",
      "Button",
      "ButtonProps",
      "Zebra",
      "default",
    ]);
  });

  it("reads the exact root importer version without treating peer suffixes as versions", () => {
    const lockfile = `lockfileVersion: '9.0'\n\nimporters:\n\n  .:\n    devDependencies:\n      '@cloudflare/kumo':\n        specifier: ^2.8.0\n        version: 2.8.0(react@19.2.0)\n      typescript:\n        specifier: ^6.0.0\n        version: 6.0.3\n\n  packages/example:\n    dependencies: {}\n`;
    assert.deepEqual(parseLockfileKumo(lockfile), { specifier: "^2.8.0", version: "2.8.0" });
  });

  it("requires an exact managed-checkout tag", () => {
    assert.equal(parseManagedCheckoutVersion('upstream_ref="@cloudflare/kumo@2.8.0"\n'), "2.8.0");
    assert.throws(
      () => parseManagedCheckoutVersion('upstream_ref="@cloudflare/kumo@^2.8.0"\n'),
      (error) => error instanceof CoverageReportError && error.code === "malformed-setup",
    );
  });

  it("blocks non-exact and drifting version authorities", () => {
    const exact = {
      installedVersion: "2.8.0",
      lockSpecifier: "2.8.0",
      lockVersion: "2.8.0",
      managedCheckoutVersion: "2.8.0",
      workspaceSpecifier: "2.8.0",
    };
    assert.doesNotThrow(() => assertVersionAuthority(exact));
    for (const overrides of [
      { lockSpecifier: "^2.8.0", workspaceSpecifier: "^2.8.0" },
      { lockVersion: "2.8.1" },
      { managedCheckoutVersion: "2.8.1" },
    ]) {
      assert.throws(
        () => assertVersionAuthority({ ...exact, ...overrides }),
        (error) => error instanceof CoverageReportError && error.code === "version-mismatch",
      );
    }
  });

  it("inventories nested component subpaths instead of silently dropping them", () => {
    const directory = mkdtempSync(join(tmpdir(), "kumo-nested-"));
    mkdirSync(join(directory, "types"));
    writeFileSync(
      join(directory, "types/server.d.ts"),
      "export declare const render: () => void;\n",
    );

    assert.deepEqual(
      readFamilyInventory(
        directory,
        {
          exports: {
            "./components/code/server": { types: "./types/server.d.ts" },
          },
        },
        "fixture",
      ),
      [
        {
          declarations: ["render"],
          exportPath: "./components/code/server",
          family: "code/server",
        },
      ],
    );
  });
});

describe("coverage classification", () => {
  it("separates exact matches, investigations, explicit mappings, and one-sided families", () => {
    const mappings = {
      ...emptyMappings,
      reviewedUpstreamExports: [
        review({
          category: "grouped-local-equivalent",
          export: "ReactName",
          family: "renamed",
          local: [{ family: "renamed", export: "SvelteName" }],
          reason: "The Svelte family uses its established idiomatic name.",
        }),
      ],
    };
    const result = classifyCoverage(
      [
        family("matched", ["Matched"]),
        family("missing-symbol", ["Present", "Missing"]),
        family("renamed", ["ReactName"]),
        family("upstream-only", ["Only"]),
      ],
      [
        family("matched", ["Matched", "SvelteSupplement"]),
        family("missing-symbol", ["Present"]),
        family("renamed", ["SvelteName"]),
        family("local-only", ["LocalOnly"]),
      ],
      mappings,
      "2.8.0",
    );

    assert.equal(result.status, "failed");
    assert.deepEqual(result.summary, {
      matched: 1,
      investigate: 1,
      "upstream-only": 1,
      "local-only": 1,
      "reviewed-difference": 1,
      investigateDeclarations: 2,
      localFamilies: 4,
      reviewedCategories: {
        "actual-missing-capability": 0,
        "deprecated-upstream-alias": 0,
        "framework-specific-omission": 0,
        "grouped-local-equivalent": 1,
        "partial-local-equivalent": 0,
      },
      reviewedDeclarations: 1,
      upstreamDeclarations: 5,
      upstreamFamilies: 4,
    });
    assert.deepEqual(
      result.entries.find((entry) => entry.evidenceKey === "component:missing-symbol")
        .exportCorrespondence.investigate,
      ["Missing"],
    );
  });

  it("reports release family and declaration changes without inferring their impact", () => {
    assert.deepEqual(
      compareReleases(
        [family("button", ["Button", "Old"]), family("removed", ["Removed"])],
        [family("button", ["Button", "New"]), family("added", ["Added"])],
        "2.7.0",
        "2.8.0",
      ),
      {
        changes: {
          declarationsChanged: [{ added: ["New"], family: "button", removed: ["Old"] }],
          familiesAdded: ["added"],
          familiesRemoved: ["removed"],
        },
        fromVersion: "2.7.0",
        status: "passed",
        toVersion: "2.8.0",
      },
    );
  });
});

describe("fail-closed mapping validation", () => {
  it("rejects duplicate mappings instead of silently choosing one", () => {
    const duplicate = {
      ...emptyMappings,
      reviewedUpstreamExports: [
        review({ export: "Button", family: "button", reason: "first" }),
        review({ export: "Button", family: "button", reason: "duplicate" }),
      ],
    };

    assert.throws(
      () => validateMappings(duplicate),
      (error) => error instanceof CoverageReportError && error.code === "duplicate-mapping",
    );
  });

  it("rejects unknown reviewed categories and category-local cardinality violations", () => {
    assert.throws(
      () =>
        validateMappings({
          ...emptyMappings,
          reviewedUpstreamExports: [review({ category: "probably-equivalent" })],
        }),
      (error) => error instanceof CoverageReportError && error.code === "malformed-mappings",
    );
    assert.throws(
      () =>
        validateMappings({
          ...emptyMappings,
          reviewedUpstreamExports: [
            review({
              category: "grouped-local-equivalent",
              local: [],
            }),
          ],
        }),
      (error) => error instanceof CoverageReportError && error.code === "malformed-mappings",
    );
  });

  it("fails valid coverage when a required reviewed classification is removed", () => {
    const upstream = [family("example", ["Present", "Missing"])];
    const local = [family("example", ["Present"])];
    const reviewed = {
      ...emptyMappings,
      reviewedUpstreamExports: [review()],
    };

    const passed = classifyCoverage(upstream, local, reviewed, "2.8.0");
    const unexplained = classifyCoverage(upstream, local, emptyMappings, "2.8.0");

    assert.equal(passed.status, "passed");
    assert.equal(passed.summary.reviewedDeclarations, 1);
    assert.equal(unexplained.status, "failed");
    assert.equal(unexplained.summary.investigateDeclarations, 1);
  });

  it("rejects stale upstream reviews and stale cross-family local references", () => {
    assert.throws(
      () =>
        classifyCoverage(
          [family("example", ["Present"])],
          [family("example", ["Present"])],
          { ...emptyMappings, reviewedUpstreamExports: [review()] },
          "2.8.0",
        ),
      (error) => error instanceof CoverageReportError && error.code === "stale-mapping",
    );

    const crossFamily = review({
      category: "grouped-local-equivalent",
      local: [{ family: "input-group", export: "InputGroup" }],
    });
    assert.equal(
      classifyCoverage(
        [family("example", ["Missing"]), family("input-group", ["InputGroup"])],
        [family("example", []), family("input-group", ["InputGroup"])],
        { ...emptyMappings, reviewedUpstreamExports: [crossFamily] },
        "2.8.0",
      ).status,
      "passed",
    );
    assert.throws(
      () =>
        classifyCoverage(
          [family("example", ["Missing"])],
          [family("example", []), family("input-group", ["Other"])],
          { ...emptyMappings, reviewedUpstreamExports: [crossFamily] },
          "2.8.0",
        ),
      (error) => error instanceof CoverageReportError && error.code === "stale-mapping",
    );
  });

  it("rejects inert reviews for upstream families with no local correspondence", () => {
    assert.throws(
      () =>
        classifyCoverage(
          [family("example", ["Missing"])],
          [],
          {
            ...emptyMappings,
            intentionalUpstreamFamilies: [
              { upstream: "example", reason: "This family is intentionally omitted." },
            ],
            reviewedUpstreamExports: [review()],
          },
          "2.8.0",
        ),
      (error) => error instanceof CoverageReportError && error.code === "stale-mapping",
    );
  });

  it("rejects missing local source-review witnesses when a repository root is authoritative", () => {
    const directory = mkdtempSync(join(tmpdir(), "kumo-mapping-sources-"));
    assert.throws(
      () =>
        validateMappings(
          { ...emptyMappings, reviewedUpstreamExports: [review()] },
          { repoRoot: directory },
        ),
      (error) => error instanceof CoverageReportError && error.code === "stale-mapping",
    );
  });

  it("rejects stale reviews after an exact local match and reviews for another version", () => {
    assert.throws(
      () =>
        classifyCoverage(
          [family("example", ["Missing"])],
          [family("example", ["Missing"])],
          { ...emptyMappings, reviewedUpstreamExports: [review()] },
          "2.8.0",
        ),
      (error) => error instanceof CoverageReportError && error.code === "stale-mapping",
    );
    assert.throws(
      () => classifyCoverage([], [], emptyMappings, "2.9.0"),
      (error) => error instanceof CoverageReportError && error.code === "version-mismatch",
    );
  });

  it("rejects an empty inventory rather than reporting vacuous coverage", () => {
    const directory = mkdtempSync(join(tmpdir(), "kumo-empty-"));
    assert.throws(
      () => readFamilyInventory(directory, { exports: {} }, "fixture"),
      (error) => error instanceof CoverageReportError && error.code === "empty-inventory",
    );
  });

  it("rejects unsupported component export patterns instead of omitting authority", () => {
    const directory = mkdtempSync(join(tmpdir(), "kumo-wildcard-"));
    assert.throws(
      () =>
        readFamilyInventory(
          directory,
          { exports: { "./components/*": { types: "./types/*.d.ts" } } },
          "fixture",
        ),
      (error) => error instanceof CoverageReportError && error.code === "unsupported-export-path",
    );
  });
});
