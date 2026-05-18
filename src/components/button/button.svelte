<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Button as BitsButton } from "bits-ui";
  import { cn } from "../../utils/cn";
  import Loader from "../loader/loader.svelte";
  import {
    buttonVariants,
    KUMO_BUTTON_DEFAULT_VARIANTS,
    type KumoButtonShape,
    type KumoButtonSize,
    type KumoButtonVariant,
  } from "./variants";

  export interface ButtonProps
    extends Omit<HTMLButtonAttributes, "class" | "children"> {
    shape?: KumoButtonShape;
    size?: KumoButtonSize;
    variant?: KumoButtonVariant;
    class?: string;
    children?: Snippet;
    icon?: Snippet;
    loading?: boolean;
    title?: string;
  }

  let {
    children,
    icon,
    class: className,
    disabled = false,
    loading = false,
    shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape,
    size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
    variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant,
    type = "button",
    title,
    ...restProps
  }: ButtonProps = $props();

  const spinnerSizes: Record<KumoButtonSize, number> = {
    xs: 12,
    sm: 14,
    base: 14,
    lg: 16,
  };
</script>

<BitsButton.Root
  data-slot="button"
  data-shape={shape}
  data-size={size}
  data-variant={variant}
  class={cn(
    buttonVariants({ variant, size, shape }),
    disabled && "cursor-not-allowed opacity-50",
    className,
  )}
  disabled={loading || disabled}
  {type}
  {title}
  {...restProps}
>
  {#if loading}
    <Loader size={spinnerSizes[size]} aria-hidden="true" />
  {:else if icon}
    {@render icon()}
  {/if}

  {#if children}
    <span class="contents">
      {@render children()}
    </span>
  {/if}
</BitsButton.Root>
