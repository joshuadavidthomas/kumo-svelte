<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  export interface SidebarCollapsibleTriggerProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
  }: SidebarCollapsibleTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-slot="sidebar-collapsible-trigger"
  {id}
  {disabled}
  class={className}
>
  {@render children?.()}
</CollapsiblePrimitive.Trigger>
