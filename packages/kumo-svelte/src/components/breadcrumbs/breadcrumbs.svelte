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
    mobile?: Snippet;
    size?: KumoBreadcrumbsSize;
  }

  let {
    children,
    class: className,
    mobile,
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
  {#if mobile}
    <div class="contents sm:hidden">
      {@render mobile()}
    </div>
    <div class="hidden sm:contents">
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
</nav>
