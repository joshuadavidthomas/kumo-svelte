<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  export interface CollapsibleRootProps {
    children: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
    open = $bindable(false),
    onOpenChange,
    onOpenChangeComplete,
  }: CollapsibleRootProps = $props();
</script>

<CollapsiblePrimitive.Root
  bind:open
  data-slot="collapsible"
  {disabled}
  {id}
  {onOpenChange}
  {onOpenChangeComplete}
  class={className}
>
  {@render children()}
</CollapsiblePrimitive.Root>
