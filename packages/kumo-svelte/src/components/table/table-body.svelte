<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export interface TableBodyProps
    extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
    children?: Snippet;
  }

  let { children, ...restProps }: TableBodyProps = $props();
</script>

<tbody {...restProps}>
  {@render children?.()}
</tbody>
