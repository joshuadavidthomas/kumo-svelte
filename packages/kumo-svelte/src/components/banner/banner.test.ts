import { describe, expect, it } from "vitest";
import { bannerVariants } from "./variants";

describe("Banner", () => {
  it("supports the upstream secondary variant", () => {
    const className = bannerVariants({ variant: "secondary" });

    expect(className).toContain("bg-kumo-contrast/5");
    expect(className).toContain("text-kumo-subtle");
  });

  it("uses the upstream borderless banner surfaces", () => {
    expect(bannerVariants()).toContain("bg-kumo-banner-info");
    expect(bannerVariants({ variant: "alert" })).toContain("bg-kumo-banner-warning");
    expect(bannerVariants({ variant: "error" })).toContain("bg-kumo-danger-tint/60");
    expect(bannerVariants()).not.toContain("border");
  });
});
