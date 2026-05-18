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
    ref?: HTMLElement | null;
  }

  let { children, class: className, ref = $bindable(null), ...restProps }: SidebarProps =
    $props();

  const sidebar = useSidebar();
  const portalContext = getKumoPortalContext();

  let desktopWidth = $derived.by(() => {
    if (sidebar.state === "expanded") {
      return sidebar.resizable ? `${sidebar.width}px` : "var(--sidebar-width)";
    }
    return sidebar.collapsible === "icon" ? "var(--sidebar-width-icon)" : "0px";
  });
</script>

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
      "relative flex h-full shrink-0 grow-0 flex-col overflow-hidden bg-kumo-base text-kumo-default",
      sidebar.variant === "sidebar" &&
        (sidebar.side === "left" ? "border-r border-kumo-hairline" : "border-l border-kumo-hairline"),
      sidebar.variant === "floating" && "m-2 rounded-lg border border-kumo-hairline shadow-lg",
      className,
    )}
    {...restProps}
  >
    {@render children()}
  </aside>
{:else if sidebar.isMobile}
  <DialogPrimitive.Root open={sidebar.openMobile} onOpenChange={sidebar.setOpenMobile}>
    <DialogPrimitive.Portal to={portalContext.container}>
      <DialogPrimitive.Overlay
        data-slot="sidebar-mobile-overlay"
        data-sidebar-backdrop
        class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <DialogPrimitive.Content
        data-slot="sidebar-mobile-content"
        data-sidebar-popup
        class={cn(
          "fixed inset-y-0 z-50 flex w-[--sidebar-width] flex-col bg-kumo-base p-0",
          "duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          sidebar.side === "left" &&
            "left-0 data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
          sidebar.side === "right" &&
            "right-0 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
        )}
        style="--sidebar-width: var(--sidebar-width); transition-property: transform, opacity;"
      >
        <DialogPrimitive.Title data-slot="sidebar-mobile-title" class="sr-only">Sidebar</DialogPrimitive.Title>
        <DialogPrimitive.Description data-slot="sidebar-mobile-description" class="sr-only">
          Displays the mobile sidebar.
        </DialogPrimitive.Description>
        <div
          bind:this={ref}
          data-slot="sidebar"
          data-sidebar="sidebar"
          data-mobile="true"
          class={cn("flex h-full w-full flex-col bg-kumo-base text-kumo-default", className)}
          {...restProps}
        >
          {@render children()}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
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
    style:width={desktopWidth}
    class={cn(
      "group/sidebar relative flex h-full shrink-0 grow-0 flex-col",
      "min-w-0 overflow-hidden whitespace-nowrap bg-kumo-base text-kumo-default",
      "transition-[width] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-[width]",
      "motion-reduce:transition-none",
      sidebar.isResizing && "transition-none!",
      sidebar.variant === "sidebar" &&
        (sidebar.side === "left" ? "border-r border-kumo-hairline" : "border-l border-kumo-hairline"),
      sidebar.variant === "floating" && "m-2 rounded-lg border border-kumo-hairline shadow-lg",
      className,
    )}
    {...restProps}
  >
    {@render children()}
  </aside>
{/if}
