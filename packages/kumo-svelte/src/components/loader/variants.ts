import { resolveVariant } from "../../utils/resolve-variant";

export const KUMO_LOADER_VARIANTS = {
  size: {
    sm: {
      description: "Small loader for inline use",
      value: 16,
    },
    base: {
      description: "Default loader size",
      value: 24,
    },
    lg: {
      description: "Large loader for prominent loading states",
      value: 32,
    },
  },
} as const;

export const KUMO_LOADER_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export type KumoLoaderSize = keyof typeof KUMO_LOADER_VARIANTS.size;

export interface KumoLoaderVariantsProps {
  size?: KumoLoaderSize | number;
}

export function loaderVariants({
  size = KUMO_LOADER_DEFAULT_VARIANTS.size,
}: KumoLoaderVariantsProps = {}): number {
  if (typeof size === "number") return size;
  return resolveVariant(KUMO_LOADER_VARIANTS.size, size, KUMO_LOADER_DEFAULT_VARIANTS.size).value;
}
