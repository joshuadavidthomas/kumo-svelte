<script lang="ts">
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface BreadcrumbsSeparatorProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: BreadcrumbsSeparatorProps = $props();
</script>

<span
  data-slot="breadcrumbs-separator"
  class={cn("flex shrink-0 items-center text-kumo-inactive", className)}
  aria-hidden="true"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <CaretRightIcon size={24} />
  {/if}
</span>
