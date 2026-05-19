import { describe, expect, it } from "vitest";
import { validateElementProps, validateUITree } from "./schemas";

describe("generated component prop validation", () => {
  it("accepts valid literal variant values", () => {
    const result = validateElementProps({
      key: "button-1",
      type: "Button",
      props: { variant: "primary", disabled: true },
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid literal variant values", () => {
    const result = validateElementProps({
      key: "button-1",
      type: "Button",
      props: { variant: "loud" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message:
          "Invalid value for Button.variant: expected one of primary, secondary, ghost, destructive, secondary-destructive, outline",
        path: ["props", "variant"],
      },
    ]);
  });

  it("rejects invalid literal union prop values", () => {
    const result = validateElementProps({
      key: "input-group-1",
      type: "InputGroup",
      props: { align: "middle" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for InputGroup.align: expected one of start, end",
        path: ["props", "align"],
      },
    ]);
  });

  it("accepts dynamic prop bindings without literal type checks", () => {
    const result = validateElementProps({
      key: "button-1",
      type: "Button",
      props: { variant: { path: "/button/variant" } },
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid primitive literal values", () => {
    const result = validateElementProps({
      key: "autocomplete-1",
      type: "Autocomplete",
      props: { disabled: "yes" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Autocomplete.disabled: expected a boolean",
        path: ["props", "disabled"],
      },
    ]);
  });

  it("rejects invalid complex array values", () => {
    const result = validateElementProps({
      key: "autocomplete-1",
      type: "Autocomplete",
      props: { items: "apple" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Autocomplete.items: expected an array",
        path: ["props", "items"],
      },
    ]);
  });

  it("rejects invalid record values", () => {
    const result = validateElementProps({
      key: "code-1",
      type: "Code",
      props: { values: [] },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Code.values: expected an object",
        path: ["props", "values"],
      },
    ]);
  });

  it("rejects invalid nested record values", () => {
    const result = validateElementProps({
      key: "code-1",
      type: "Code",
      props: { values: { javascript: { highlight: true } } },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Code.values: javascript value is required",
        path: ["props", "values"],
      },
    ]);
  });

  it("rejects invalid union branch item values", () => {
    const result = validateElementProps({
      key: "select-1",
      type: "Select",
      props: { items: [{ label: "Apple", value: 1 }] },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Select.items: expected an object or an array",
        path: ["props", "items"],
      },
    ]);
  });

  it("rejects invalid snippet values", () => {
    const result = validateElementProps({
      key: "button-1",
      type: "Button",
      props: { children: 123 },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for Button.children: expected a snippet function",
        path: ["props", "children"],
      },
    ]);
  });

  it("accepts string content for snippet-or-string props", () => {
    const result = validateElementProps({
      key: "field-1",
      type: "Field",
      props: { label: "Name" },
    });

    expect(result.success).toBe(true);
  });

  it("accepts portal targets described by external types", () => {
    const result = validateElementProps({
      key: "tooltip-1",
      type: "Tooltip",
      props: { to: "#tooltip-root" },
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid external object values", () => {
    const result = validateElementProps({
      key: "date-range-picker-1",
      type: "DateRangePicker",
      props: { value: "today" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      {
        message: "Invalid value for DateRangePicker.value: expected an object",
        path: ["props", "value"],
      },
    ]);
  });

  it("prefixes UI tree prop validation paths with the element key", () => {
    const result = validateUITree({
      root: "button-1",
      elements: {
        "button-1": {
          key: "button-1",
          type: "Button",
          props: { variant: "loud" },
        },
      },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["elements", "button-1", "props", "variant"]);
  });
});
