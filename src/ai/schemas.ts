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
      if (!schema?.values || isDynamicValue(value)) continue;

      if (typeof value !== "string" || !schema.values.includes(value as never)) {
        issues.push({
          message: `Invalid value for ${element.type}.${name}: expected one of ${schema.values.join(", ")}`,
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
