<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebarGroup } from "./context.svelte";

  export interface SidebarGroupContentProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarGroupContentProps = $props();
  const group = useSidebarGroup();
</script>

{#if group.isCollapsible}
  <CollapsiblePrimitive.Content>
    {#snippet child({ props })}
      <div
        {...props}
        {...restProps}
        data-sidebar="group-content"
        class={cn(
          "overflow-hidden transition-[height] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "motion-reduce:transition-none",
          className,
        )}
      >
        <div class="overflow-hidden">
          {@render children?.()}
        </div>
      </div>
    {/snippet}
  </CollapsiblePrimitive.Content>
{:else}
  <div data-sidebar="group-content" class={cn("flex flex-col", className)} {...restProps}>
    {@render children?.()}
  </div>
{/if}
