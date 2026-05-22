<script lang="ts">
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
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M10.75 8.75L14.25 12L10.75 15.25"
      />
    </svg>
  {/if}
</span>
