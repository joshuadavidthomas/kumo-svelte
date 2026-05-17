<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { LAYER_CARD_SECONDARY_CLASSES } from "./variants";

  export interface LayerCardSecondaryProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: LayerCardSecondaryProps = $props();
</script>

<div class={cn(LAYER_CARD_SECONDARY_CLASSES, className)} {...restProps}>
  {@render children?.()}
</div>
