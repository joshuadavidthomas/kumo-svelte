<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import {
    layerCardVariants,
    LAYER_CARD_LAYERED_ROOT_CLASSES,
  } from "./variants";

  export interface LayerCardProps extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    as?: keyof HTMLElementTagNameMap;
    children?: Snippet;
    class?: string;
    layered?: boolean;
  }

  let {
    as = "div",
    children,
    class: className,
    layered = false,
    ...restProps
  }: LayerCardProps = $props();
</script>

<svelte:element
  this={as}
  class={cn(layered ? LAYER_CARD_LAYERED_ROOT_CLASSES : layerCardVariants(), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
