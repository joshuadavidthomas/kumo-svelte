<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export interface TableOfContentsProps
    extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    children?: Snippet;
  }

  let {
    children,
    "aria-label": ariaLabel = "Table of contents",
    ...restProps
  }: TableOfContentsProps = $props();
</script>

<nav data-slot="table-of-contents" aria-label={ariaLabel} {...restProps}>
  {@render children?.()}
</nav>
