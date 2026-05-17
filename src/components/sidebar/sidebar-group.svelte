<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setSidebarGroupContext } from "./context.svelte";

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
    data-sidebar="group"
    class={cn(
      "flex min-w-0 flex-col gap-0.5",
      "group-data-[state=collapsed]/sidebar:gap-0",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/snippet}

{#if collapsible}
  <CollapsiblePrimitive.Root bind:open {onOpenChange} class="min-w-0">
    {@render GroupContent()}
  </CollapsiblePrimitive.Root>
{:else}
  {@render GroupContent()}
{/if}
