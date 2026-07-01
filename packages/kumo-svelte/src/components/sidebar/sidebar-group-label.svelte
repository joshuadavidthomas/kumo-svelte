<script lang="ts">
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebarGroup } from "./context.svelte";
  import SidebarCollapsibleTrigger from "./sidebar-collapsible-trigger.svelte";

  export interface SidebarGroupLabelProps
    extends Omit<HTMLAttributes<HTMLElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarGroupLabelProps = $props();
  const group = useSidebarGroup();
</script>

{#if group.isCollapsible}
  <SidebarCollapsibleTrigger>
    {#snippet child({ props })}
      <button
        {...restProps}
        {...props}
        type="button"
        data-slot="sidebar-group-label"
        data-sidebar="group-label"
        class={cn(
          "group/group-label flex w-full cursor-pointer items-center px-3 py-1 text-xs font-medium text-kumo-subtle",
          "group-data-[state=collapsed]/sidebar:hidden",
          className,
        )}
      >
        <span data-slot="sidebar-group-label-text" class="flex-1 truncate text-left">{@render children?.()}</span>
        <CaretRightIcon
          data-slot="sidebar-group-label-icon"
          class="ml-auto size-3 shrink-0 text-kumo-subtle transition-transform duration-200 group-data-[state=open]/group-label:rotate-90"
        />
      </button>
    {/snippet}
  </SidebarCollapsibleTrigger>
{:else}
  <div
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    class={cn(
      "grid overflow-hidden",
      "transition-[grid-template-rows,margin,border-color] duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
      "group-data-[mobile=true]/sidebar:transition-none",
      "my-3 grid-rows-[0fr] border-b border-kumo-line",
      "[[data-sidebar=group]:first-child_&]:my-0 [[data-sidebar=group]:first-child_&]:border-transparent",
      "group-not-data-[state=collapsed]/sidebar:my-0 group-not-data-[state=collapsed]/sidebar:grid-rows-[1fr] group-not-data-[state=collapsed]/sidebar:border-transparent",
      "group-data-[mobile=true]/sidebar:my-0 group-data-[mobile=true]/sidebar:grid-rows-[1fr] group-data-[mobile=true]/sidebar:border-transparent",
      className,
    )}
    {...restProps}
  >
    <div class="min-h-0 min-w-0">
      <div class="mt-4 mb-2 truncate px-3 text-sm font-medium text-kumo-subtle [[data-sidebar=group]:first-child_&]:mt-2">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
