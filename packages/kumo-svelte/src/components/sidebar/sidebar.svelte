<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { useSidebar } from "./context.svelte";

  export interface SidebarProps
    extends Omit<HTMLAttributes<HTMLElement>, "children" | "class"> {
    children: Snippet;
    class?: string;
    contentClassName?: string;
    ref?: HTMLElement | null;
  }

  let {
    children,
    class: className,
    contentClassName,
    ref = $bindable(null),
    ...restProps
  }: SidebarProps = $props();

  const sidebar = useSidebar();
  const portalContext = getKumoPortalContext();

  let expandedWidth = $derived(sidebar.resizable ? `${sidebar.width}px` : "var(--sidebar-width)");
  let collapsedWidth = $derived(
    sidebar.collapsible === "icon" ? "var(--sidebar-width-icon)" : "0px",
  );
  let railWidth = $derived(sidebar.open ? expandedWidth : collapsedWidth);
  let contentWidth = $derived(sidebar.open || sidebar.isPeeking ? expandedWidth : collapsedWidth);

  function eventStartedInFooter(event: Event) {
    return event.target instanceof Element && Boolean(event.target.closest('[data-sidebar="footer"]'));
  }

  function handlePeekPointerOver(event: PointerEvent) {
    if (!eventStartedInFooter(event)) {
      sidebar.startPeek();
    }
  }

  function handlePeekPointerOut(event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      sidebar.stopPeek();
    }
  }

  function handlePeekFocus(event: FocusEvent) {
    if (!eventStartedInFooter(event)) {
      sidebar.startPeek();
    }
  }

  function handlePeekBlur(event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      sidebar.stopPeek();
    }
  }

  let borderClasses = $derived.by(() => {
    if (sidebar.variant === "sidebar") {
      return sidebar.side === "left" ? "border-r border-kumo-line" : "border-l border-kumo-line";
    }
    if (sidebar.variant === "floating") {
      return "border border-kumo-line";
    }
    return "";
  });
</script>

{#snippet MobileDrawer()}
  <DialogPrimitive.Overlay
    data-slot="sidebar-mobile-overlay"
    data-sidebar-backdrop
    class={cn(
      sidebar.contained ? "absolute inset-0 z-40 bg-kumo-recessed" : "fixed inset-0 z-40 bg-kumo-recessed",
      "opacity-80 transition-opacity duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
      "motion-reduce:transition-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
    )}
  />
  <DialogPrimitive.Content
    data-slot="sidebar-mobile-content"
    data-sidebar-popup
    class={cn(
      sidebar.contained
        ? "absolute inset-y-0 z-50 flex w-(--sidebar-width) flex-col overflow-hidden"
        : "fixed inset-y-0 z-50 flex w-(--sidebar-width) flex-col overflow-hidden",
      "bg-(--sidebar-bg) p-0 text-kumo-default transition-transform duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
      "motion-reduce:transition-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      sidebar.side === "left" &&
        "left-0 border-r border-kumo-line data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
      sidebar.side === "right" &&
        "right-0 border-l border-kumo-line data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
    )}
  >
    <DialogPrimitive.Title data-slot="sidebar-mobile-title" class="sr-only">Navigation</DialogPrimitive.Title>
    <DialogPrimitive.Description data-slot="sidebar-mobile-description" class="sr-only">
      Displays the mobile sidebar.
    </DialogPrimitive.Description>
    <nav
      bind:this={ref}
      aria-label="Navigation"
      aria-hidden={!sidebar.openMobile}
      data-slot="sidebar"
      data-state={sidebar.openMobile ? "expanded" : "collapsed"}
      data-side={sidebar.side}
      data-variant={sidebar.variant}
      data-collapsible={sidebar.collapsible}
      data-sidebar="sidebar"
      data-mobile="true"
      class={cn("group/sidebar flex h-full w-full flex-col bg-(--sidebar-bg) text-kumo-default", className)}
      {...restProps}
    >
      {@render children()}
    </nav>
  </DialogPrimitive.Content>
{/snippet}

{#if sidebar.collapsible === "none"}
  <aside
    bind:this={ref}
    data-slot="sidebar"
    data-state="expanded"
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-sidebar="sidebar"
    style="width: var(--sidebar-width); min-width: var(--sidebar-width); max-width: var(--sidebar-width);"
    class={cn(
      "relative flex h-full shrink-0 grow-0 flex-col overflow-hidden bg-(--sidebar-bg) text-kumo-default",
      sidebar.variant === "sidebar" &&
        (sidebar.side === "left" ? "border-r border-kumo-line" : "border-l border-kumo-line"),
      sidebar.variant === "floating" && "m-2 rounded-lg border border-kumo-line shadow-lg",
      className,
    )}
    {...restProps}
  >
    {@render children()}
  </aside>
{:else if sidebar.isMobile}
  <DialogPrimitive.Root open={sidebar.openMobile} onOpenChange={sidebar.setOpenMobile}>
    {#if sidebar.contained}
      {@render MobileDrawer()}
    {:else}
      <DialogPrimitive.Portal to={portalContext.container}>
        {@render MobileDrawer()}
      </DialogPrimitive.Portal>
    {/if}
  </DialogPrimitive.Root>
{:else}
  <aside
    bind:this={ref}
    data-slot="sidebar"
    data-state={sidebar.state}
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-collapsible={sidebar.collapsible}
    data-sidebar="sidebar"
    style:width={railWidth}
    class={cn(
      "group/sidebar relative h-full shrink-0 grow-0 overflow-visible",
      "transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
      "motion-reduce:transition-none",
      sidebar.isResizing && "transition-none!",
      sidebar.variant === "floating" && "m-2 rounded-lg shadow-lg",
      className,
    )}
    {...restProps}
  >
    <div
      data-sidebar="content-container"
      style:width={contentWidth}
      class={cn(
        "flex h-full flex-col min-w-0 overflow-hidden whitespace-nowrap bg-(--sidebar-bg) text-kumo-default",
        borderClasses,
        "transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
        "motion-reduce:transition-none",
        sidebar.isResizing && "transition-none!",
        !sidebar.open &&
          cn(
            sidebar.contained ? "absolute" : "fixed",
            "inset-y-0 z-40",
            sidebar.side === "left" && "left-0",
            sidebar.side === "right" && "right-0",
          ),
        sidebar.open && "relative",
        contentClassName,
      )}
    >
      <div
        data-sidebar="peek-zone"
        role="presentation"
        class="flex min-h-0 flex-1 flex-col"
        onpointerover={handlePeekPointerOver}
        onpointerout={handlePeekPointerOut}
        onfocusin={handlePeekFocus}
        onfocusout={handlePeekBlur}
      >
        {@render children()}
      </div>
    </div>
  </aside>
{/if}
