<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils";
  import { setSidebarContext, type SidebarState } from "./context.svelte";
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
    animationDuration?: number;
    children: Snippet;
    class?: string;
    collapsible?: SidebarCollapsible;
    contained?: boolean;
    defaultOpen?: boolean;
    defaultWidth?: number;
    maxWidth?: number;
    minWidth?: number;
    mobileBreakpoint?: number;
    onOpenChange?: (open: boolean) => void;
    onWidthChange?: (width: number) => void;
    open?: boolean;
    peekable?: boolean;
    resizable?: boolean;
    side?: SidebarSide;
    style?: string;
    variant?: SidebarVariant;
    width?: number;
  }

  let {
    animationDuration = KUMO_SIDEBAR_STYLING.animation.duration,
    children,
    class: className,
    collapsible = KUMO_SIDEBAR_DEFAULT_VARIANTS.collapsible,
    contained = false,
    defaultOpen = true,
    defaultWidth = DEFAULT_WIDTH_PX,
    maxWidth = MAX_WIDTH_PX,
    minWidth = MIN_WIDTH_PX,
    mobileBreakpoint = KUMO_SIDEBAR_STYLING.mobile.breakpoint,
    onOpenChange,
    onWidthChange,
    open = $bindable(defaultOpen),
    peekable = false,
    resizable = false,
    side = KUMO_SIDEBAR_DEFAULT_VARIANTS.side,
    style,
    variant = KUMO_SIDEBAR_DEFAULT_VARIANTS.variant,
    width = $bindable(defaultWidth),
  }: SidebarProviderProps = $props();

  let openMobile = $state(false);
  let isMobile = $state(false);
  let isResizing = $state(false);
  let isPeeking = $state(false);

  let sidebarState = $derived<SidebarState>(open ? "expanded" : isPeeking ? "peeking" : "collapsed");
  let effectiveOpenMobile = $derived(isMobile && onOpenChange ? open : openMobile);
  let sidebarWidth = $derived(resizable ? `${width}px` : KUMO_SIDEBAR_STYLING.width.expanded);
  let wrapperStyle = $derived(
    `--sidebar-width: ${sidebarWidth}; --sidebar-width-icon: ${KUMO_SIDEBAR_STYLING.width.icon}; --sidebar-animation-duration: ${animationDuration}ms; --sidebar-easing: ${KUMO_SIDEBAR_STYLING.animation.easing}; --sidebar-bg: var(--color-kumo-base); --sidebar-active-bg: var(--color-kumo-tint);${style ? ` ${style}` : ""}`,
  );

  function setOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }

  function setOpenMobile(nextOpen: boolean) {
    openMobile = nextOpen;
    if (isMobile && onOpenChange) {
      open = nextOpen;
      onOpenChange(nextOpen);
    }
  }

  function setWidth(nextWidth: number) {
    const clamped = Math.min(maxWidth, Math.max(minWidth, nextWidth));
    width = clamped;
    onWidthChange?.(clamped);
  }

  function startPeek() {
    if (peekable && !open && !isMobile) {
      isPeeking = true;
    }
  }

  function stopPeek() {
    isPeeking = false;
  }

  function toggleSidebar() {
    if (isMobile) {
      setOpenMobile(!effectiveOpenMobile);
    } else {
      stopPeek();
      setOpen(!open);
    }
  }

  setSidebarContext({
    get animationDuration() {
      return animationDuration;
    },
    get collapsible() {
      return collapsible;
    },
    get contained() {
      return contained;
    },
    get isMobile() {
      return isMobile;
    },
    get isPeeking() {
      return isPeeking;
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
      return effectiveOpenMobile;
    },
    get peekable() {
      return peekable;
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
    startPeek,
    stopPeek,
    toggleSidebar,
  });

  $effect(() => {
    const media = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
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
    "group/sidebar-wrapper relative isolate flex w-full [--sidebar-bg:var(--color-kumo-base)] [--sidebar-active-bg:var(--color-kumo-tint)]",
    !contained && !isMobile && "min-h-svh",
    "has-data-[variant=inset]:bg-kumo-recessed",
    isResizing && "select-none",
    className,
  )}
>
  {@render children()}
</div>
