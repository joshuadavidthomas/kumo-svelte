<script lang="ts">
  import SidebarSimpleIcon from "phosphor-svelte/lib/SidebarSimpleIcon";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebar } from "./context.svelte";

  export interface SidebarTriggerProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, onclick, ...restProps }: SidebarTriggerProps = $props();
  const sidebar = useSidebar("SidebarTrigger");

  let expanded = $derived(sidebar.isMobile ? sidebar.openMobile : sidebar.open);

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
  data-sidebar="trigger"
  data-kumo-component="Sidebar"
  data-kumo-part="trigger"
  aria-expanded={expanded}
  aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
  class={cn(
    "flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-lg",
    "text-kumo-subtle hover:bg-(--sidebar-active-bg) hover:text-kumo-default",
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand focus-visible:outline-none",
    className,
  )}
  onclick={handleClick}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <SidebarSimpleIcon class="size-[18px] shrink-0" />
  {/if}
</button>
