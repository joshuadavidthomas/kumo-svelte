<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    badgeVariants,
    KUMO_BADGE_DEFAULT_VARIANTS,
    type KumoBadgeVariant,
  } from "./variants";

  export interface BadgeProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    variant?: KumoBadgeVariant;
    class?: string;
    children: Snippet;
  }

  let {
    variant = KUMO_BADGE_DEFAULT_VARIANTS.variant,
    class: className,
    children,
    ...restProps
  }: BadgeProps = $props();
</script>

<span class={cn(badgeVariants({ variant }), className)} {...restProps}>
  {@render children()}
</span>
