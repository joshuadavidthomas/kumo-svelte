<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    breadcrumbsVariants,
    KUMO_BREADCRUMBS_DEFAULT_VARIANTS,
    type KumoBreadcrumbsSize,
  } from "./variants";

  export interface BreadcrumbsProps
    extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    mobileChildren?: Snippet;
    size?: KumoBreadcrumbsSize;
  }

  let {
    children,
    class: className,
    mobileChildren,
    size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size,
    ...restProps
  }: BreadcrumbsProps = $props();
</script>

<nav
  data-slot="breadcrumbs"
  aria-label="breadcrumb"
  class={cn(breadcrumbsVariants({ size }), className)}
  {...restProps}
>
  {#if mobileChildren}
    <div class="contents sm:hidden">
      {@render mobileChildren()}
    </div>
    <div class="hidden sm:contents">
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
</nav>
