<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    badgeVariants,
    KUMO_BADGE_DEFAULT_VARIANTS,
    KUMO_BADGE_DOT_VARIANTS,
    type KumoBadgeAppearance,
    type KumoBadgeVariant,
  } from "./variants";

  export interface BadgeProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    appearance?: KumoBadgeAppearance;
    variant?: KumoBadgeVariant;
    class?: string;
    children: Snippet;
  }

  let {
    appearance = KUMO_BADGE_DEFAULT_VARIANTS.appearance,
    variant = KUMO_BADGE_DEFAULT_VARIANTS.variant,
    class: className,
    children,
    ...restProps
  }: BadgeProps = $props();

  function getDotClass(variant: KumoBadgeVariant) {
    if (variant in KUMO_BADGE_DOT_VARIANTS) {
      return KUMO_BADGE_DOT_VARIANTS[variant as keyof typeof KUMO_BADGE_DOT_VARIANTS];
    }

    return undefined;
  }

  let dotClass = $derived(getDotClass(variant));
</script>

<span class={cn(badgeVariants({ appearance, variant }), className)} {...restProps}>
  {#if appearance === "dot" && dotClass}
    <span aria-hidden="true" class={cn("size-1.75 shrink-0 rounded-full", dotClass)}></span>
  {/if}
  {@render children()}
</span>
