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
