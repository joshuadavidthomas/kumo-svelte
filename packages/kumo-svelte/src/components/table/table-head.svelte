<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLThAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { stickyColumnClasses, type KumoTableStickyColumn } from "./variants";

  export interface TableHeadProps extends Omit<HTMLThAttributes, "class" | "children"> {
    children?: Snippet;
    class?: string;
    sticky?: KumoTableStickyColumn;
  }

  let { children, class: className, sticky, ...restProps }: TableHeadProps = $props();
</script>

<th
  class={cn("group relative", sticky && stickyColumnClasses(sticky, "head"), className)}
  {...restProps}
>
  {@render children?.()}
</th>
