import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

interface ConditionalExport {
  default?: string;
  svelte?: string;
  types?: string;
}

interface PackageJson {
  exports: Record<string, ConditionalExport | string>;
  files: string[];
  name: string;
  peerDependencies?: Record<string, string>;
  svelte?: string;
  type: string;
  types?: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const packageJson = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf-8"),
) as PackageJson;

function directoriesAt(path: string) {
  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isDirectory())
    .sort();
}

function exportedNames(prefix: string) {
  const pattern = new RegExp(`^\\./${prefix}/([^/*]+)$`);

  return Object.keys(packageJson.exports)
    .map((exportPath) => exportPath.match(pattern)?.[1])
    .filter((name): name is string => name !== undefined)
    .sort();
}

function expectExportPathExists(exportPath: string, path: string) {
  const relativePath = path.replace(/^\.\//, "");
  expect(existsSync(join(packageRoot, relativePath)), `${exportPath} -> ${path}`).toBe(true);
}

describe("package export contract", () => {
  it("exports every public component directory", () => {
    const componentDirectories = directoriesAt(join(packageRoot, "src/components"));
    const componentExports = exportedNames("components");

    expect(componentExports).toEqual(componentDirectories);
  });

  it("points each component export at its source barrel", () => {
    for (const componentName of exportedNames("components")) {
      const exportPath = `./components/${componentName}`;
      const exportConfig = packageJson.exports[exportPath];
      const expectedPath = `./src/components/${componentName}/index.ts`;

      expect(typeof exportConfig).toBe("object");
      expect(exportConfig).toEqual({
        svelte: expectedPath,
        types: expectedPath,
        default: expectedPath,
      });
      expectExportPathExists(exportPath, expectedPath);
    }
  });

  it("exports every public block directory", () => {
    const blockDirectories = directoriesAt(join(packageRoot, "src/blocks"));
    const blockExports = exportedNames("blocks");

    expect(blockExports).toEqual(blockDirectories);
  });

  it("keeps required package entrypoints available", () => {
    expect(Object.hasOwn(packageJson.exports, ".")).toBe(false);
    expect(packageJson.exports).toHaveProperty("./utils");
    expect(packageJson.exports).toHaveProperty("./components/code/server");
    expect(packageJson.exports).toHaveProperty("./styles");
    expect(packageJson.exports).toHaveProperty("./styles/standalone");
    expect(packageJson.exports).toHaveProperty("./blocks/delete-resource");
  });

  it("does not expose removed generated metadata surfaces", () => {
    const exportPaths = Object.keys(packageJson.exports);

    expect(exportPaths.some((path) => path.startsWith("./registry"))).toBe(false);
    expect(exportPaths.some((path) => path.startsWith("./ai"))).toBe(false);
    expect(exportPaths.some((path) => path.startsWith("./catalog"))).toBe(false);
  });

  it("points all concrete package export paths at files in the package", () => {
    for (const [exportPath, exportConfig] of Object.entries(packageJson.exports)) {
      if (exportPath.includes("*")) continue;

      if (typeof exportConfig === "string") {
        expectExportPathExists(exportPath, exportConfig);
        continue;
      }

      for (const path of Object.values(exportConfig)) {
        if (path) expectExportPathExists(exportPath, path);
      }
    }
  });

  it("points wildcard package exports at existing source directories", () => {
    for (const [exportPath, exportConfig] of Object.entries(packageJson.exports)) {
      if (!exportPath.includes("*")) continue;
      if (typeof exportConfig !== "string") continue;

      const directoryPath = exportConfig.replace(/^\.\//, "").replace(/\*.*$/, "");
      expect(existsSync(join(packageRoot, directoryPath)), `${exportPath} -> ${exportConfig}`).toBe(
        true,
      );
    }
  });

  it("declares the expected peer dependencies", () => {
    expect(packageJson.peerDependencies).toMatchObject({
      echarts: expect.any(String),
      svelte: expect.any(String),
      tailwindcss: expect.any(String),
    });
  });

  it("publishes only source package files", () => {
    expect(packageJson.name).toBe("kumo-svelte");
    expect(packageJson.type).toBe("module");
    expect(packageJson.files).toEqual(["src", "README.md", "CHANGELOG.md", "LICENSE"]);
    expect(packageJson.svelte).toBeUndefined();
    expect(packageJson.types).toBeUndefined();
  });
});
