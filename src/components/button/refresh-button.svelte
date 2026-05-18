<script lang="ts">
  import type { Snippet } from "svelte";
  import ArrowClockwiseIcon from "phosphor-svelte/lib/ArrowClockwiseIcon.svelte";
  import type { ButtonProps } from "./button.svelte";
  import Button from "./button.svelte";
  import { cn } from "../../utils/cn";

  export interface RefreshButtonProps extends Omit<ButtonProps, "children"> {
    children?: Snippet;
  }

  let {
    "aria-label": ariaLabel = "Refresh",
    loading = false,
    size = "base",
    children,
    ...restProps
  }: RefreshButtonProps = $props();

  const iconSizes = {
    xs: 16,
    sm: 16,
    base: 18,
    lg: 20,
  } as const;
</script>

<Button
  data-slot="refresh-button"
  shape="square"
  aria-label={ariaLabel}
  {loading}
  {size}
  {...restProps}
>
  {#snippet icon()}
    <ArrowClockwiseIcon
      aria-hidden="true"
      size={iconSizes[size]}
      weight="bold"
      class={cn(loading && "animate-refresh")}
    />
  {/snippet}

  {#if children}
    {@render children()}
  {/if}
</Button>
