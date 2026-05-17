<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export interface DropdownMenuRootProps {
    children?: Snippet;
    dir?: "ltr" | "rtl";
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    open?: boolean;
  }

  let {
    children,
    dir,
    onOpenChange,
    onOpenChangeComplete,
    open = $bindable(false),
  }: DropdownMenuRootProps = $props();
</script>

<DropdownMenuPrimitive.Root bind:open {dir} {onOpenChange} {onOpenChangeComplete}>
  {@render children?.()}
</DropdownMenuPrimitive.Root>
