<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAnchorAttributes, "children"> {
    children?: Snippet;
    to?: string;
  }

  let { children, href, to, ...restProps }: Props = $props();
</script>

<a data-custom-router-link href={href ?? to} {...restProps}>
  {@render children?.()}
</a>
