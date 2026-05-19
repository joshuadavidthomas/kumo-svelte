<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import type { ComponentProps } from "svelte";

  export interface SidebarCollapsibleTriggerProps
    extends ComponentProps<typeof CollapsiblePrimitive.Trigger> {
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarCollapsibleTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-slot="sidebar-collapsible-trigger"
  class={className}
  {...restProps}
>
  {@render children?.()}
</CollapsiblePrimitive.Trigger>
