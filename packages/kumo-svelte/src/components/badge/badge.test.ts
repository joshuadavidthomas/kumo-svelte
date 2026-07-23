import { describe, expect, it } from "vitest";
import { badgeVariants } from "./variants";

describe("Badge", () => {
  it.each(["error", "warning", "success", "info"] as const)(
    "consumes the %s status tint directly",
    (variant) => {
      expect(badgeVariants({ variant })).toContain(
        `bg-kumo-${variant === "error" ? "danger" : variant}-tint`,
      );
      expect(badgeVariants({ variant })).not.toMatch(/bg-kumo-\S+-tint\/\d+/);
    },
  );
});
