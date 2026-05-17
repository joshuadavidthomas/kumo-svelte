<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    KUMO_TEXT_DEFAULT_VARIANTS,
    KUMO_TEXT_VARIANTS,
    type KumoTextSize,
    type KumoTextVariant,
    type TextElement,
  } from "./variants";

  export interface TextProps
    extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    variant?: KumoTextVariant;
    size?: KumoTextSize;
    bold?: boolean;
    truncate?: boolean;
    as?: TextElement;
    DANGEROUS_className?: string;
    DANGEROUS_style?: string;
    children?: Snippet;
  }

  let {
    variant = KUMO_TEXT_DEFAULT_VARIANTS.variant,
    bold = false,
    size = KUMO_TEXT_DEFAULT_VARIANTS.size,
    truncate = false,
    children,
    DANGEROUS_className,
    DANGEROUS_style,
    as,
    ...restProps
  }: TextProps = $props();

  const copyVariants = ["body", "secondary", "success", "error"];
  const monoVariants = ["mono", "mono-secondary"];

  let isCopy = $derived(copyVariants.includes(variant));
  let isMono = $derived(monoVariants.includes(variant));
  let element = $derived(
    as ?? (monoVariants.includes(variant) || variant.startsWith("heading") ? "span" : "p"),
  );
</script>

<svelte:element
  this={element}
  class={cn(
    "text-kumo-default",
    KUMO_TEXT_VARIANTS.variant[variant].classes,
    isCopy ? KUMO_TEXT_VARIANTS.size[size].classes : "",
    isCopy && bold ? "font-medium" : "",
    isMono &&
      (size === "lg"
        ? KUMO_TEXT_VARIANTS.size.base.classes
        : KUMO_TEXT_VARIANTS.size.sm.classes),
    truncate && "truncate min-w-0",
    DANGEROUS_className,
  )}
  style={DANGEROUS_style}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>
