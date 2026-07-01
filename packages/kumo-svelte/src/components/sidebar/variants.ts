import { cn, resolveVariant } from "../../utils";

export const KUMO_SIDEBAR_VARIANTS = {
  variant: {
    sidebar: {
      classes: "",
      description: "Standard sidebar with border separator",
    },
    floating: {
      classes: "",
      description: "Floating sidebar with shadow and rounded corners",
    },
    inset: {
      classes: "",
      description: "Inset sidebar within the content area",
    },
  },
  collapsible: {
    icon: {
      classes: "",
      description: "Collapses to show icons only",
    },
    offcanvas: {
      classes: "",
      description: "Slides off screen when collapsed",
    },
    none: {
      classes: "",
      description: "Cannot be collapsed",
    },
  },
  side: {
    left: {
      classes: "",
      description: "Left-aligned sidebar",
    },
    right: {
      classes: "",
      description: "Right-aligned sidebar",
    },
  },
} as const;

export const KUMO_SIDEBAR_DEFAULT_VARIANTS = {
  variant: "sidebar",
  collapsible: "icon",
  side: "left",
} as const;

export const KUMO_SIDEBAR_STYLING = {
  width: {
    expanded: "16.25rem",
    icon: "57px",
  },
  mobile: {
    breakpoint: 768,
  },
  animation: {
    duration: 250,
    easing: "cubic-bezier(0.77, 0, 0.175, 1)",
  },
} as const;

export type SidebarSide = keyof typeof KUMO_SIDEBAR_VARIANTS.side;
export type SidebarVariant = keyof typeof KUMO_SIDEBAR_VARIANTS.variant;
export type SidebarCollapsible = keyof typeof KUMO_SIDEBAR_VARIANTS.collapsible;

export interface KumoSidebarVariantsProps {
  collapsible?: SidebarCollapsible;
  side?: SidebarSide;
  variant?: SidebarVariant;
}

export function sidebarVariants({
  collapsible = KUMO_SIDEBAR_DEFAULT_VARIANTS.collapsible,
  side = KUMO_SIDEBAR_DEFAULT_VARIANTS.side,
  variant = KUMO_SIDEBAR_DEFAULT_VARIANTS.variant,
}: KumoSidebarVariantsProps = {}) {
  return cn(
    resolveVariant(KUMO_SIDEBAR_VARIANTS.variant, variant, KUMO_SIDEBAR_DEFAULT_VARIANTS.variant)
      .classes,
    resolveVariant(
      KUMO_SIDEBAR_VARIANTS.collapsible,
      collapsible,
      KUMO_SIDEBAR_DEFAULT_VARIANTS.collapsible,
    ).classes,
    resolveVariant(KUMO_SIDEBAR_VARIANTS.side, side, KUMO_SIDEBAR_DEFAULT_VARIANTS.side).classes,
  );
}
