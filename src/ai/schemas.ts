import type { UIElement, UITree } from "../catalog/types";
import { KUMO_COMPONENT_PROP_SCHEMAS } from "./component-props";

export const KUMO_COMPONENT_NAMES = [
  "Autocomplete",
  "Badge",
  "Banner",
  "Breadcrumbs",
  "Button",
  "Chart",
  "Checkbox",
  "ClipboardText",
  "CloudflareLogo",
  "Code",
  "Collapsible",
  "Combobox",
  "CommandPalette",
  "DatePicker",
  "DateRangePicker",
  "DeleteResource",
  "Dialog",
  "Dropdown",
  "Empty",
  "Field",
  "Flow",
  "Grid",
  "Input",
  "InputGroup",
  "Label",
  "LayerCard",
  "Link",
  "Loader",
  "Menubar",
  "Meter",
  "Pagination",
  "Popover",
  "Radio",
  "Select",
  "SensitiveInput",
  "Sidebar",
  "Surface",
  "Switch",
  "Table",
  "TableOfContents",
  "Tabs",
  "Text",
  "Toast",
  "Tooltip",
] as const;

export type KumoComponentName = (typeof KUMO_COMPONENT_NAMES)[number];

interface Issue {
  message: string;
  path: (number | string)[];
}

interface ParseResult<T = unknown> {
  data?: T;
  error?: { issues: Issue[] };
  success: boolean;
}

interface RuntimePropSchema {
  type: string;
  values?: readonly string[];
}

const componentNameSet = new Set<string>(KUMO_COMPONENT_NAMES);

export const UIElementBaseSchema = {
  safeParse(data: unknown): ParseResult<UIElement> {
    const issues = validateElementShape(data);
    if (issues.length > 0) return { success: false, error: { issues } };
    return { success: true, data: data as UIElement };
  },
};

export function validateElementProps(element: UIElement): ParseResult<UIElement> {
  const issues: Issue[] = [];

  if (!componentNameSet.has(element.type)) {
    issues.push({
      message: `Unknown Kumo component: ${element.type}`,
      path: ["type"],
    });
  }

  if (element.props === null || typeof element.props !== "object" || Array.isArray(element.props)) {
    issues.push({ message: "Element props must be an object", path: ["props"] });
  } else {
    const propSchemas = KUMO_COMPONENT_PROP_SCHEMAS[
      element.type as keyof typeof KUMO_COMPONENT_PROP_SCHEMAS
    ] as Record<string, RuntimePropSchema> | undefined;

    for (const [name, value] of Object.entries(element.props)) {
      const schema = propSchemas?.[name];
      if (!schema || isDynamicValue(value)) continue;

      if (schema.values && (typeof value !== "string" || !schema.values.includes(value as never))) {
        issues.push({
          message: `Invalid value for ${element.type}.${name}: expected one of ${schema.values.join(", ")}`,
          path: ["props", name],
        });
        continue;
      }

      const primitiveIssue = validatePrimitivePropValue(schema.type, value);
      if (primitiveIssue) {
        issues.push({
          message: `Invalid value for ${element.type}.${name}: ${primitiveIssue}`,
          path: ["props", name],
        });
      }
    }
  }

  if (issues.length > 0) return { success: false, error: { issues } };
  return { success: true, data: element };
}

export function validateUITree(tree: unknown): ParseResult<UITree> {
  const issues: Issue[] = [];

  if (tree === null || typeof tree !== "object" || Array.isArray(tree)) {
    return {
      success: false,
      error: { issues: [{ message: "UI tree must be an object", path: [] }] },
    };
  }

  const candidate = tree as Partial<UITree>;

  if (typeof candidate.root !== "string") {
    issues.push({ message: "UI tree root must be a string", path: ["root"] });
  }

  if (
    candidate.elements === null ||
    typeof candidate.elements !== "object" ||
    Array.isArray(candidate.elements)
  ) {
    issues.push({
      message: "UI tree elements must be an object",
      path: ["elements"],
    });
  } else {
    for (const [key, element] of Object.entries(candidate.elements)) {
      for (const issue of validateElementShape(element)) {
        issues.push({ ...issue, path: ["elements", key, ...issue.path] });
      }
      if (issues.length === 0) {
        const propsResult = validateElementProps(element as UIElement);
        if (!propsResult.success) {
          for (const issue of propsResult.error?.issues ?? []) {
            issues.push({ ...issue, path: ["elements", key, ...issue.path] });
          }
        }
      }
    }
  }

  if (
    typeof candidate.root === "string" &&
    candidate.elements &&
    typeof candidate.elements === "object" &&
    !(candidate.root in candidate.elements)
  ) {
    issues.push({
      message: "UI tree root must reference an element key",
      path: ["root"],
    });
  }

  if (issues.length > 0) return { success: false, error: { issues } };
  return { success: true, data: tree as UITree };
}

function validateElementShape(element: unknown): Issue[] {
  const issues: Issue[] = [];

  if (element === null || typeof element !== "object" || Array.isArray(element)) {
    return [{ message: "Element must be an object", path: [] }];
  }

  const candidate = element as Partial<UIElement>;

  if (typeof candidate.key !== "string") {
    issues.push({ message: "Element key must be a string", path: ["key"] });
  }

  if (typeof candidate.type !== "string") {
    issues.push({ message: "Element type must be a string", path: ["type"] });
  }

  if (
    candidate.props === null ||
    typeof candidate.props !== "object" ||
    Array.isArray(candidate.props)
  ) {
    issues.push({ message: "Element props must be an object", path: ["props"] });
  }

  if (
    candidate.children !== undefined &&
    (!Array.isArray(candidate.children) ||
      candidate.children.some((child) => typeof child !== "string"))
  ) {
    issues.push({
      message: "Element children must be an array of element keys",
      path: ["children"],
    });
  }

  return issues;
}

function isDynamicValue(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as { path?: unknown }).path === "string"
  );
}

function validatePrimitivePropValue(type: string, value: unknown): string | undefined {
  const expected = runtimeExpectation(type);
  if (!expected) return undefined;

  if (expected === "string") {
    return typeof value === "string" ? undefined : "expected a string";
  }

  if (expected === "number") {
    return typeof value === "number" ? undefined : "expected a number";
  }

  if (expected === "boolean") {
    return typeof value === "boolean" ? undefined : "expected a boolean";
  }

  if (expected === "string[]") {
    return isArrayOf(value, "string") ? undefined : "expected an array of strings";
  }

  if (expected === "number[]") {
    return isArrayOf(value, "number") ? undefined : "expected an array of numbers";
  }

  if (expected === "boolean[]") {
    return isArrayOf(value, "boolean") ? undefined : "expected an array of booleans";
  }

  if (expected === "string|string[]") {
    return typeof value === "string" || isArrayOf(value, "string")
      ? undefined
      : "expected a string or an array of strings";
  }

  if (expected === "string|number") {
    return typeof value === "string" || typeof value === "number"
      ? undefined
      : "expected a string or a number";
  }

  if (expected === "snippet") {
    return typeof value === "function" ? undefined : "expected a snippet function";
  }

  if (expected === "snippet|string") {
    return typeof value === "function" || typeof value === "string"
      ? undefined
      : "expected a string or snippet function";
  }

  if (expected === "function") {
    return typeof value === "function" ? undefined : "expected a function";
  }

  if (expected === "array") {
    return Array.isArray(value) ? undefined : "expected an array";
  }

  if (expected === "array[]") {
    return Array.isArray(value) && value.every(Array.isArray)
      ? undefined
      : "expected an array of arrays";
  }

  if (expected === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? undefined
      : "expected an object";
  }

  return undefined;
}

function runtimeExpectation(type: string) {
  const normalized = type.replace(/\s+/g, " ").trim();
  const withoutOptional = normalized
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part !== "undefined" && part !== "null")
    .join(" | ");

  if (withoutOptional !== normalized) return runtimeExpectation(withoutOptional);

  if (normalized === "string") return "string";
  if (normalized === "number") return "number";
  if (normalized === "boolean") return "boolean";
  if (normalized === "string[]") return "string[]";
  if (normalized === "number[]") return "number[]";
  if (normalized === "boolean[]") return "boolean[]";
  if (normalized === "string | string[]" || normalized === "string[] | string") {
    return "string|string[]";
  }
  if (normalized === "number | string" || normalized === "string | number") {
    return "string|number";
  }
  if (normalized === "Snippet") return "snippet";
  if (normalized === "Snippet | string" || normalized === "string | Snippet") {
    return "snippet|string";
  }
  if (normalized.includes("=>")) return "function";
  if (normalized.endsWith("[][]")) return "array[]";
  if (normalized.endsWith("[]") || normalized.startsWith("ReadonlyArray<")) {
    return "array";
  }
  if (
    normalized.startsWith("Record<") ||
    normalized.startsWith("Partial<") ||
    (normalized.startsWith("{") && normalized.endsWith("}"))
  ) {
    return "object";
  }

  return undefined;
}

function isArrayOf(value: unknown, itemType: "boolean" | "number" | "string") {
  return Array.isArray(value) && value.every((item) => typeof item === itemType);
}
