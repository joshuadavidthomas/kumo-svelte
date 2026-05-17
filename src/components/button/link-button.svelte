<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    buttonVariants,
    KUMO_BUTTON_DEFAULT_VARIANTS,
    type KumoButtonShape,
    type KumoButtonSize,
    type KumoButtonVariant,
  } from "./variants";

  export interface LinkButtonProps
    extends Omit<HTMLAnchorAttributes, "class" | "children"> {
    shape?: KumoButtonShape;
    size?: KumoButtonSize;
    variant?: KumoButtonVariant;
    class?: string;
    children?: Snippet;
    icon?: Snippet;
    external?: boolean;
    linksExternal?: boolean;
  }

  let {
    children,
    icon,
    class: className,
    external = false,
    href,
    shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape,
    size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
    variant = "ghost",
    ...restProps
  }: LinkButtonProps = $props();
</script>

<a
  class={cn(
    buttonVariants({ variant, size, shape }),
    "flex items-center no-underline!",
    className,
  )}
  {href}
  target={external ? "_blank" : restProps.target}
  rel={external ? "noopener noreferrer" : restProps.rel}
  {...restProps}
>
  {#if icon}
    {@render icon()}
  {/if}

  {#if children}
    {@render children()}
  {/if}
</a>
