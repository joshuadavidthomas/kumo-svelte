<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTableAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TABLE_DEFAULT_VARIANTS,
    tableVariants,
    type KumoTableLayout,
  } from "./variants";

  export interface TableProps extends Omit<HTMLTableAttributes, "class" | "children"> {
    children?: Snippet;
    class?: string;
    layout?: KumoTableLayout;
  }

  let {
    children,
    class: className,
    layout = KUMO_TABLE_DEFAULT_VARIANTS.layout,
    ...restProps
  }: TableProps = $props();
</script>

<table class={cn(tableVariants({ layout }), className)} {...restProps}>
  {@render children?.()}
</table>
