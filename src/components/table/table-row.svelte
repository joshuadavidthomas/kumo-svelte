<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TABLE_DEFAULT_VARIANTS,
    tableRowVariants,
    type KumoTableRowVariant,
  } from "./variants";

  export interface TableRowProps
    extends Omit<HTMLAttributes<HTMLTableRowElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    variant?: KumoTableRowVariant;
  }

  let {
    children,
    class: className,
    variant = KUMO_TABLE_DEFAULT_VARIANTS.variant,
    ...restProps
  }: TableRowProps = $props();
</script>

<tr class={cn(tableRowVariants({ variant }), className)} {...restProps}>
  {@render children?.()}
</tr>
