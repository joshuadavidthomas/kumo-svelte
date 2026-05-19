<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils";
  import { setSidebarContext } from "./context.svelte";
  import {
    KUMO_SIDEBAR_DEFAULT_VARIANTS,
    KUMO_SIDEBAR_STYLING,
    type SidebarCollapsible,
    type SidebarSide,
    type SidebarVariant,
  } from "./variants";

  const DEFAULT_WIDTH_PX = 256;
  const MIN_WIDTH_PX = 200;
  const MAX_WIDTH_PX = 480;

  export interface SidebarProviderProps {
    children: Snippet;
    class?: string;
    collapsible?: SidebarCollapsible;
    defaultOpen?: boolean;
    defaultWidth?: number;
    maxWidth?: number;
    minWidth?: number;
    onOpenChange?: (open: boolean) => void;
    onWidthChange?: (width: number) => void;
    open?: boolean;
    resizable?: boolean;
    side?: SidebarSide;
    style?: string;
    variant?: SidebarVariant;
    width?: number;
  }

  let {
    children,
    class: className,
    collapsible = KUMO_SIDEBAR_DEFAULT_VARIANTS.collapsible,
    defaultOpen = true,
    defaultWidth = DEFAULT_WIDTH_PX,
    maxWidth = MAX_WIDTH_PX,
    minWidth = MIN_WIDTH_PX,
    onOpenChange,
    onWidthChange,
    open = $bindable(defaultOpen),
    resizable = false,
    side = KUMO_SIDEBAR_DEFAULT_VARIANTS.side,
    style,
    variant = KUMO_SIDEBAR_DEFAULT_VARIANTS.variant,
    width = $bindable(defaultWidth),
  }: SidebarProviderProps = $props();

  let openMobile = $state(false);
  let isMobile = $state(false);
  let isResizing = $state(false);

  let sidebarState = $derived<"collapsed" | "expanded">(
    open ? "expanded" : "collapsed",
  );
  let sidebarWidth = $derived(resizable ? `${width}px` : KUMO_SIDEBAR_STYLING.width.expanded);
  let wrapperStyle = $derived(
    `--sidebar-width: ${sidebarWidth}; --sidebar-width-icon: ${KUMO_SIDEBAR_STYLING.width.icon};${style ? ` ${style}` : ""}`,
  );

  function setOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }

  function setOpenMobile(nextOpen: boolean) {
    openMobile = nextOpen;
  }

  function setWidth(nextWidth: number) {
    const clamped = Math.min(maxWidth, Math.max(minWidth, nextWidth));
    width = clamped;
    onWidthChange?.(clamped);
  }

  function toggleSidebar() {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  }

  setSidebarContext({
    get collapsible() {
      return collapsible;
    },
    get isMobile() {
      return isMobile;
    },
    get isResizing() {
      return isResizing;
    },
    get maxWidth() {
      return maxWidth;
    },
    get minWidth() {
      return minWidth;
    },
    get open() {
      return open;
    },
    get openMobile() {
      return openMobile;
    },
    get resizable() {
      return resizable;
    },
    get side() {
      return side;
    },
    get state() {
      return sidebarState;
    },
    get variant() {
      return variant;
    },
    get width() {
      return width;
    },
    setIsResizing(nextResizing) {
      isResizing = nextResizing;
    },
    setOpen,
    setOpenMobile,
    setWidth,
    toggleSidebar,
  });

  $effect(() => {
    const media = window.matchMedia(
      `(max-width: ${KUMO_SIDEBAR_STYLING.mobile.breakpoint - 1}px)`,
    );
    const update = () => {
      isMobile = media.matches;
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  });
</script>

<div
  data-sidebar-wrapper
  data-state={sidebarState}
  data-side={side}
  style={wrapperStyle}
  class={cn(
    "group/sidebar-wrapper flex min-h-svh w-full",
    "has-data-[variant=inset]:bg-kumo-recessed",
    isResizing && "select-none",
    className,
  )}
>
  {@render children()}
</div>
