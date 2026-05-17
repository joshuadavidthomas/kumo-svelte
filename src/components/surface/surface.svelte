<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import LayerCard from "../layer-card/layer-card.svelte";
  import { KUMO_SURFACE_DEFAULT_VARIANTS, type KumoSurfaceColor } from "./variants";

  export interface SurfaceProps extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    as?: keyof HTMLElementTagNameMap;
    children?: Snippet;
    class?: string;
    color?: KumoSurfaceColor;
  }

  let {
    as = "div",
    children,
    class: className,
    color = KUMO_SURFACE_DEFAULT_VARIANTS.color,
    ...restProps
  }: SurfaceProps = $props();
</script>

<LayerCard
  {as}
  class={cn("overflow-visible rounded-none", className)}
  data-surface-color={color}
  data-deprecated="surface"
  {...restProps}
>
  {@render children?.()}
</LayerCard>
