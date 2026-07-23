import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CoverageReportError,
  classifyCoverage,
  compareReleases,
  parseDeclaredExports,
  parseLockfileKumo,
  readFamilyInventory,
  validateMappings,
} from "./report-upstream-coverage.mjs";

const emptyMappings = {
  schemaVersion: 1,
  familyMappings: [],
  intentionalUpstreamFamilies: [],
  intentionalLocalFamilies: [],
  symbolMappings: [],
  intentionalUpstreamExports: [],
};

function family(name, declarations) {
  return { declarations, exportPath: `./components/${name}`, family: name };
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
      symbolMappings: [
        {
          upstream: { family: "renamed", export: "ReactName" },
          local: { family: "renamed", export: "SvelteName" },
          kind: "renamed",
          reason: "The Svelte family uses its established idiomatic name.",
        },
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
    );

    assert.equal(result.status, "failed");
    assert.deepEqual(result.summary, {
      matched: 1,
      investigate: 1,
      "upstream-only": 1,
      "local-only": 1,
      "intentional-mapping": 1,
      investigateDeclarations: 2,
      localFamilies: 4,
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
      intentionalUpstreamExports: [
        { family: "button", exports: ["Button"], reason: "first" },
        { family: "button", exports: ["Button"], reason: "duplicate" },
      ],
    };

    assert.throws(
      () => validateMappings(duplicate),
      (error) => error instanceof CoverageReportError && error.code === "duplicate-mapping",
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
