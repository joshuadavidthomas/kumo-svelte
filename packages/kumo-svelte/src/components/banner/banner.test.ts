import { describe, expect, it } from "vitest";
import { bannerIconVariants, bannerVariants } from "./variants";

describe("Banner", () => {
  it("supports the upstream secondary variant", () => {
    const className = bannerVariants({ variant: "secondary" });

    expect(className).toContain("bg-kumo-contrast/5");
    expect(className).toContain("text-kumo-default/70");
    expect(bannerIconVariants({ variant: "secondary" })).toBe("fill-kumo-interact");
  });

  it("consumes the upstream status tints and fills directly", () => {
    expect(bannerVariants()).toContain("bg-kumo-info-tint");
    expect(bannerVariants({ variant: "alert" })).toContain("bg-kumo-warning-tint");
    expect(bannerVariants({ variant: "error" })).toContain("bg-kumo-danger-tint");
    expect(bannerIconVariants()).toBe("fill-kumo-info");
    expect(bannerIconVariants({ variant: "alert" })).toBe("fill-kumo-warning");
    expect(bannerIconVariants({ variant: "error" })).toBe("fill-kumo-danger");
    expect(bannerVariants()).not.toContain("border");
  });
});
