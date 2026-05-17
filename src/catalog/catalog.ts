import {
  KUMO_COMPONENT_NAMES,
  UIElementBaseSchema,
  validateElementProps,
  validateUITree,
} from "../ai/schemas";
import type {
  ActionDefinition,
  CatalogConfig,
  KumoCatalog,
  UIElement,
  UITree,
  ValidationResult,
} from "./types";

export interface SchemasModule {
  KUMO_COMPONENT_NAMES: readonly string[];
  UIElementBaseSchema: typeof UIElementBaseSchema;
  validateElementProps: typeof validateElementProps;
  validateUITree: typeof validateUITree;
}

const schemasModule: SchemasModule = {
  KUMO_COMPONENT_NAMES,
  UIElementBaseSchema,
  validateElementProps,
  validateUITree,
};

export async function loadSchemas(): Promise<SchemasModule> {
  return schemasModule;
}

export function createKumoCatalog(config: CatalogConfig = {}): KumoCatalog {
  const { actions = {} } = config;
  const actionNames = Object.keys(actions);

  return {
    get componentNames(): readonly string[] {
      return schemasModule.KUMO_COMPONENT_NAMES;
    },

    get actionNames(): readonly string[] {
      return actionNames;
    },

    hasComponent(type: string): boolean {
      return schemasModule.KUMO_COMPONENT_NAMES.includes(type);
    },

    hasAction(name: string): boolean {
      return name in actions;
    },

    validateElement(element: unknown): ValidationResult {
      const result = schemasModule.UIElementBaseSchema.safeParse(element);

      if (!result.success) {
        return {
          success: false,
          error: result.error?.issues ?? [{ message: "Validation failed", path: [] }],
        };
      }

      const propsResult = schemasModule.validateElementProps(result.data as UIElement);
      if (!propsResult.success) {
        return {
          success: false,
          error: propsResult.error?.issues.map((issue) => ({
            message: issue.message,
            path: ["props", ...issue.path],
          })),
        };
      }

      return { success: true, data: result.data };
    },

    validateTree(tree: unknown): ValidationResult<UITree> {
      const result = schemasModule.validateUITree(tree);

      if (result.success) {
        return { success: true, data: result.data as UITree };
      }

      return {
        success: false,
        error: result.error?.issues ?? [{ message: "Validation failed", path: [] }],
      };
    },

    generatePrompt(): string {
      const lines: string[] = [
        "# Kumo Component Catalog",
        "",
        "You are generating UI using Kumo components. Output must be valid JSON matching the UITree schema.",
        "",
        "## Available Components",
        "",
      ];

      for (const name of schemasModule.KUMO_COMPONENT_NAMES) {
        lines.push(`- \`${name}\``);
      }

      if (actionNames.length > 0) {
        lines.push("");
        lines.push("## Available Actions");
        lines.push("");
        for (const [name, def] of Object.entries(actions)) {
          lines.push(`- \`${name}\`: ${(def as ActionDefinition).description}`);
        }
      }

      lines.push("");
      lines.push("## Output Format");
      lines.push("");
      lines.push("```json");
      lines.push("{");
      lines.push('  "root": "element-1",');
      lines.push('  "elements": {');
      lines.push('    "element-1": {');
      lines.push('      "key": "element-1",');
      lines.push('      "type": "ComponentName",');
      lines.push('      "props": { ... },');
      lines.push('      "children": ["element-2"],');
      lines.push('      "visible": true | { "path": "/data/path" } | { "auth": "signedIn" }');
      lines.push("    }");
      lines.push("  }");
      lines.push("}");
      lines.push("```");

      return lines.join("\n");
    },
  };
}

export async function initCatalog(_catalog: KumoCatalog): Promise<void> {
  await loadSchemas();
}
