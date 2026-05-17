<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import type { ComponentProps } from "svelte";
  import { cn } from "../../utils";

  export interface SidebarCollapsibleContentProps
    extends ComponentProps<typeof CollapsiblePrimitive.Content> {
    class?: string;
  }

  let { class: className, ...restProps }: SidebarCollapsibleContentProps = $props();
</script>

<CollapsiblePrimitive.Content
  class={cn(
    "overflow-hidden transition-[height] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
    "motion-reduce:transition-none",
    className,
  )}
  {...restProps}
/>
