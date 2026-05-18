<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";

  export type TooltipRootProps = Omit<TooltipPrimitive.RootProps, "children"> & {
    children?: Snippet;
  };

  let { children, open = $bindable(false), ...restProps }: TooltipRootProps = $props();
</script>

<TooltipPrimitive.Root bind:open {...restProps}>
  {@render children?.()}
</TooltipPrimitive.Root>
