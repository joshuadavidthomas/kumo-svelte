<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface PaginationSeparatorProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
  }

  let {
    class: className,
    ...restProps
  }: PaginationSeparatorProps = $props();
</script>

<div
  data-slot="pagination-separator"
  class={cn("mx-2 h-6 border-l border-kumo-hairline", className)}
  {...restProps}
></div>

