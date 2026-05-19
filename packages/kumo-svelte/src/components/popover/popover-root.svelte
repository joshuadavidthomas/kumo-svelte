<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover as PopoverPrimitive } from "bits-ui";

  export interface PopoverRootProps {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    children,
    open = $bindable(false),
    onOpenChange,
    onOpenChangeComplete,
  }: PopoverRootProps = $props();
</script>

<PopoverPrimitive.Root bind:open {onOpenChange} {onOpenChangeComplete}>
  {@render children?.()}
</PopoverPrimitive.Root>
