<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import SkeletonLine from "../loader/skeleton-line.svelte";

  export interface BreadcrumbsCurrentProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    icon?: Snippet;
    loading?: boolean;
  }

  let {
    children,
    class: className,
    icon,
    loading = false,
    ...restProps
  }: BreadcrumbsCurrentProps = $props();
</script>

{#if loading}
  <div
    data-slot="breadcrumbs-current"
    class={cn("flex w-[125px] min-w-0 items-center gap-1", className)}
    {...restProps}
  >
    {#if icon}
      <span class="flex shrink-0 items-center">
        {@render icon()}
      </span>
    {/if}
    <SkeletonLine />
  </div>
{:else}
  <div
    data-slot="breadcrumbs-current"
    class={cn("flex min-w-0 max-w-full items-center gap-1 font-medium", className)}
    aria-current="page"
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
  </div>
{/if}
