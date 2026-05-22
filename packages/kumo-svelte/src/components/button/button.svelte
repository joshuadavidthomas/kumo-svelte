<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Button as BitsButton } from "bits-ui";
  import Loader from "../loader/loader.svelte";
  import { cn } from "../../utils/cn";
  import TooltipContent from "../tooltip/tooltip-content.svelte";
  import TooltipRoot from "../tooltip/tooltip-root.svelte";
  import TooltipTrigger from "../tooltip/tooltip-trigger.svelte";
  import {
    buttonVariants,
    KUMO_BUTTON_DEFAULT_VARIANTS,
    type KumoButtonShape,
    type KumoButtonSize,
    type KumoButtonVariant,
  } from "./variants";

  export interface ButtonProps
    extends Omit<HTMLButtonAttributes, "class" | "children" | "title"> {
    shape?: KumoButtonShape;
    size?: KumoButtonSize;
    variant?: KumoButtonVariant;
    class?: string;
    children?: Snippet;
    icon?: Component;
    loading?: boolean;
    title?: Snippet | string | null;
  }

  let {
    children,
    icon: Icon,
    class: className,
    disabled = false,
    loading = false,
    onclick,
    shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape,
    size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
    variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant,
    title,
    type = "button",
    ...restProps
  }: ButtonProps = $props();

  const spinnerSizes: Record<KumoButtonSize, number> = {
    xs: 12,
    sm: 14,
    base: 14,
    lg: 16,
  };

  function composeClickHandlers(props: Record<string, unknown>) {
    const childClick = props.onclick;

    if (typeof childClick !== "function") {
      return onclick;
    }

    if (!onclick) {
      return childClick as HTMLButtonAttributes["onclick"];
    }

    return ((event) => {
      childClick(event);

      if (!event.defaultPrevented) {
        onclick(event);
      }
    }) satisfies HTMLButtonAttributes["onclick"];
  }
</script>

{#snippet button(props: Record<string, unknown> = {})}
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
    {...restProps}
    {...props}
    onclick={composeClickHandlers(props)}
  >
    {#if loading}
      <Loader size={spinnerSizes[size]} aria-hidden="true" />
    {:else if Icon}
      <Icon aria-hidden="true" />
    {/if}

    {#if children}
      <span class="contents">
        {@render children()}
      </span>
    {/if}
  </BitsButton.Root>
{/snippet}

{#snippet titledButton()}
  <TooltipTrigger>
    {#snippet child({ props })}
      {@render button(props)}
    {/snippet}
  </TooltipTrigger>
  <TooltipContent>
    {#if typeof title === "string"}
      {title}
    {:else if title}
      {@render title()}
    {/if}
  </TooltipContent>
{/snippet}

{#if title}
  <TooltipRoot>
    {@render titledButton()}
  </TooltipRoot>
{:else}
  {@render button()}
{/if}
