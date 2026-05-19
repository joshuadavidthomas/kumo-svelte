<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTdAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { stickyColumnClasses, type KumoTableStickyColumn } from "./variants";

  export interface TableCellProps extends Omit<HTMLTdAttributes, "class" | "children"> {
    children?: Snippet;
    class?: string;
    sticky?: KumoTableStickyColumn;
  }

  let { children, class: className, sticky, ...restProps }: TableCellProps = $props();
</script>

<td class={cn(sticky && stickyColumnClasses(sticky, "cell"), className)} {...restProps}>
  {@render children?.()}
</td>
