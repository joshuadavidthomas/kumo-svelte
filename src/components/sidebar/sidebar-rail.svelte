<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebar } from "./context.svelte";

  export interface SidebarRailProps
    extends Omit<HTMLButtonAttributes, "class" | "type"> {
    class?: string;
  }

  let { class: className, onclick, ...restProps }: SidebarRailProps = $props();
  const sidebar = useSidebar("SidebarRail");

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onclick?.(event);
    if (event.defaultPrevented) return;
    sidebar.toggleSidebar();
  }
</script>

<button
  type="button"
  data-sidebar="rail"
  aria-label="Toggle sidebar"
  tabindex={-1}
  class={cn(
    "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 cursor-pointer transition-all",
    "after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-kumo-brand/20",
    "group-data-[side=left]/sidebar-wrapper:right-0 group-data-[side=right]/sidebar-wrapper:left-0",
    "sm:flex",
    className,
  )}
  onclick={handleClick}
  {...restProps}
></button>
