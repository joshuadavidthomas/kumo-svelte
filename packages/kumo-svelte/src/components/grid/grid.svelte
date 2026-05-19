<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { setGridContext } from "./context";
  import {
    gridVariants,
    KUMO_GRID_DEFAULT_VARIANTS,
    type KumoGridGap,
    type KumoGridVariant,
  } from "./variants";

  export interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    gap?: KumoGridGap;
    mobileDivider?: boolean;
    variant?: KumoGridVariant;
  }

  let {
    children,
    class: className,
    gap = KUMO_GRID_DEFAULT_VARIANTS.gap,
    mobileDivider = false,
    variant,
    ...restProps
  }: GridProps = $props();

  setGridContext({
    get gap() {
      return gap;
    },
    get mobileDivider() {
      return mobileDivider;
    },
    get variant() {
      return variant;
    },
  });
</script>

<div class={cn(gridVariants({ gap, variant }), className)} {...restProps}>
  {@render children?.()}
</div>
