import { cn } from "../../utils/cn";

export const KUMO_TABS_VARIANTS = {
  size: ["base", "sm"],
  variant: ["segmented", "underline"],
} as const;

export const KUMO_TABS_DEFAULT_VARIANTS = {
  size: "base",
  variant: "segmented",
} as const;

export const KUMO_TABS_STYLING = {
  container: {
    background: "color-accent",
    borderRadius: 8,
    height: 34,
    padding: 1,
  },
  indicator: {
    background: "color-surface-secondary",
    borderRadius: 6,
    ring: "color-color-2",
    shadow: "shadow-sm",
  },
  tab: {
    activeColor: "text-color-surface",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    inactiveColor: "text-color-label",
    paddingX: 10,
    verticalMargin: 1,
  },
} as const;

export type KumoTabsVariant = (typeof KUMO_TABS_VARIANTS.variant)[number];
export type KumoTabsSize = (typeof KUMO_TABS_VARIANTS.size)[number];

export interface KumoTabsVariantsProps {
  size?: KumoTabsSize;
  variant?: KumoTabsVariant;
}

export function tabsListVariants({
  size = KUMO_TABS_DEFAULT_VARIANTS.size,
  variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
}: KumoTabsVariantsProps = {}) {
  const segmented = variant === "segmented";
  const underline = variant === "underline";

  return cn(
    "relative flex min-w-0 shrink items-stretch",
    segmented &&
      "kumo-tabs-list overflow-x-auto rounded-lg bg-kumo-recessed px-0.5 ring ring-kumo-hairline/70 [--scroll-fade-width:3rem]",
    segmented && (size === "sm" ? "h-6.5 rounded-md" : "h-9"),
    underline && "gap-4 border-b border-kumo-hairline pb-2",
    underline && (size === "sm" ? "h-6.5" : "h-7.5"),
  );
}

export function tabsTriggerVariants({
  size = KUMO_TABS_DEFAULT_VARIANTS.size,
  variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
}: KumoTabsVariantsProps = {}) {
  const segmented = variant === "segmented";
  const underline = variant === "underline";

  return cn(
    "relative z-2 flex items-center rounded bg-transparent whitespace-nowrap focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
    size === "sm" ? "text-xs" : "text-base",
    segmented &&
      "my-0.5 rounded-md text-kumo-subtle hover:text-kumo-default data-[state=active]:text-kumo-default focus-visible:ring-inset",
    segmented && (size === "sm" ? "px-2" : "px-2.5"),
    underline &&
      "text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default data-[state=active]:font-medium data-[state=active]:text-kumo-default",
    underline && (size === "sm" ? "px-1.5 py-2.5" : "px-2 py-3"),
    underline &&
      "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-kumo-brand after:opacity-0 after:transition-opacity data-[state=active]:after:opacity-100",
  );
}
