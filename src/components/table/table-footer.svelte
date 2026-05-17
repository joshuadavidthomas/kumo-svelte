<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export interface TableFooterProps
    extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
    children?: Snippet;
  }

  let { children, ...restProps }: TableFooterProps = $props();
</script>

<tfoot {...restProps}>
  {@render children?.()}
</tfoot>
