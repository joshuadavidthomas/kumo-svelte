<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";

  export interface TooltipProviderProps {
    children: Snippet;
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    disabled?: boolean;
  }

  let {
    children,
    delayDuration,
    skipDelayDuration,
    disableHoverableContent,
    disabled,
  }: TooltipProviderProps = $props();
</script>

<TooltipPrimitive.Provider
  {delayDuration}
  {skipDelayDuration}
  {disableHoverableContent}
  {disabled}
>
  {@render children()}
</TooltipPrimitive.Provider>
