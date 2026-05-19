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
  aria-label="Toggle sidebar"
  class={cn(
    "flex items-center rounded-md p-1.5",
    "text-kumo-subtle hover:bg-kumo-overlay hover:text-kumo-default",
    "focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "transition-colors duration-150",
    className,
  )}
  onclick={handleClick}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <SidebarSimpleIcon class="size-5" />
  {/if}
</button>
