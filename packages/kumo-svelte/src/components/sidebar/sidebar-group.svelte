<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setSidebarGroupContext } from "./context.svelte";
  import SidebarCollapsible from "./sidebar-collapsible.svelte";

  export interface SidebarGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }

  let {
    children,
    class: className,
    collapsible = false,
    defaultOpen = true,
    onOpenChange,
    open = $bindable(defaultOpen),
    ...restProps
  }: SidebarGroupProps = $props();

  setSidebarGroupContext({
    get isCollapsible() {
      return collapsible;
    },
    get isOpen() {
      return open;
    },
  });
</script>

{#snippet GroupContent()}
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    class={cn("flex min-w-0 flex-col gap-y-px", className)}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/snippet}

{#if collapsible}
  <SidebarCollapsible bind:open {onOpenChange} class="min-w-0">
    {@render GroupContent()}
  </SidebarCollapsible>
{:else}
  {@render GroupContent()}
{/if}
