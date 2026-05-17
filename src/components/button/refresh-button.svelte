<script lang="ts">
  import type { Snippet } from "svelte";
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
</script>

<Button
  shape="square"
  aria-label={ariaLabel}
  {loading}
  {size}
  {...restProps}
>
  {#snippet icon()}
    <svg
      aria-hidden="true"
      viewBox="0 0 256 256"
      fill="currentColor"
      class={cn({
        "animate-refresh": loading,
        "size-4.5": size === "base",
        "size-4": size === "sm" || size === "xs",
        "size-5": size === "lg",
      })}
    >
      <path
        d="M224 128a96 96 0 0 1-164.4 67.6 8 8 0 0 1 11.3-11.3A80 80 0 1 0 48 128v8.7l18.3-18.4a8 8 0 0 1 11.4 11.4l-32 32a8 8 0 0 1-11.4 0l-32-32a8 8 0 0 1 11.4-11.4L32 136.7V128a96 96 0 0 1 192 0Z"
      />
    </svg>
  {/snippet}

  {#if children}
    {@render children()}
  {/if}
</Button>
