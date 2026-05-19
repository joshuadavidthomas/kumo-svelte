import { buttonVariants } from "../button";
import { KUMO_INPUT_VARIANTS, type KumoInputSize } from "../input";
import { cn } from "../../utils/cn";

export const KUMO_SELECT_VARIANTS = {
  size: KUMO_INPUT_VARIANTS.size,
} as const;

export const KUMO_SELECT_DEFAULT_VARIANTS = {
  size: "base",
} as const;

export const KUMO_SELECT_STYLING = {
  trigger: {
    background: "bg-kumo-elevated",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 400,
    height: 36,
    paddingX: 12,
    ring: "color-border",
    text: "text-color-surface",
  },
  stateTokens: {
    disabled: { opacity: 0.5 },
    focus: { ring: "color-active" },
  },
  icons: {
    caret: { name: "caret-up-down", size: 20 },
    check: { name: "check", size: 20 },
  },
  option: {
    borderRadius: 4,
    fontSize: 16,
    highlightBackground: "color-surface-secondary",
    paddingX: 8,
    paddingY: 6,
  },
  popup: {
    background: "bg-kumo-elevated",
    borderRadius: 8,
    padding: 6,
    ring: "border-kumo-line",
  },
} as const;

export type KumoSelectSize = keyof typeof KUMO_SELECT_VARIANTS.size;
export type SelectSize = KumoSelectSize;

export interface KumoSelectVariantsProps {
  size?: KumoSelectSize;
}

export function selectVariants({
  size = KUMO_SELECT_DEFAULT_VARIANTS.size,
}: KumoSelectVariantsProps = {}) {
  return cn(
    buttonVariants({ size }),
    "justify-between font-normal",
    "focus:opacity-100 focus:ring-kumo-focus/50 focus-visible:ring-inset *:in-focus:opacity-100",
  );
}

export const KUMO_SELECT_TRIGGER_ICON_STYLES: Record<
  KumoInputSize,
  { iconSize: number; className: string }
> = {
  base: { className: "text-kumo-subtle", iconSize: 16 },
  lg: { className: "text-kumo-subtle", iconSize: 18 },
  sm: { className: "text-kumo-subtle", iconSize: 14 },
  xs: { className: "text-kumo-subtle", iconSize: 12 },
};
