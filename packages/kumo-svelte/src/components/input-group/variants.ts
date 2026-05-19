import { cn } from "../../utils/cn";
import type { KumoInputSize } from "../input/variants";

export const KUMO_INPUT_GROUP_VARIANTS = {
  size: {
    xs: {
      classes: "h-6 text-xs",
      description: "Extra small size.",
    },
    sm: {
      classes: "h-7 text-xs",
      description: "Small size.",
    },
    base: {
      classes: "h-9 text-base",
      description: "Default size.",
    },
    lg: {
      classes: "h-11 text-base",
      description: "Large size.",
    },
  },
} as const;

export const KUMO_INPUT_GROUP_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type KumoInputGroupSize = keyof typeof KUMO_INPUT_GROUP_VARIANTS.size;

export interface KumoInputGroupVariantsProps {
  size?: KumoInputSize;
}

export function inputGroupVariants(_props: KumoInputGroupVariantsProps = {}) {
  return cn("relative w-full cursor-text");
}
