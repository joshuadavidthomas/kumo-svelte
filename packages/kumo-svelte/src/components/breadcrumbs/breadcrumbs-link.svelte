<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface BreadcrumbsLinkProps
    extends Omit<HTMLAnchorAttributes, "class" | "children"> {
    children?: Snippet;
    class?: string;
    icon?: Snippet;
  }

  let {
    children,
    class: className,
    icon,
    ...restProps
  }: BreadcrumbsLinkProps = $props();
</script>

<a
  data-slot="breadcrumbs-link"
  class={cn(
    "flex min-w-0 max-w-full items-center gap-1 text-kumo-subtle no-underline",
    className,
  )}
  {...restProps}
>
  {#if icon}
    <span class="flex shrink-0 items-center">
      {@render icon()}
    </span>
  {/if}
  <span class="truncate">
    {@render children?.()}
  </span>
</a>
