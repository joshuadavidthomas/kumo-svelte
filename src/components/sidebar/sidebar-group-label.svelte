<script lang="ts">
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon.svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebarGroup } from "./context.svelte";
  import SidebarCollapsibleTrigger from "./sidebar-collapsible-trigger.svelte";

  export interface SidebarGroupLabelProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
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
      "truncate px-3 py-1 text-xs font-medium text-kumo-subtle",
      "group-data-[state=collapsed]/sidebar:hidden",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
