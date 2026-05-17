<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import ArrowSvg from "./arrow-svg.svelte";
  import {
    KUMO_TOOLTIP_DEFAULT_VARIANTS,
    tooltipVariants,
    type KumoTooltipAlign,
    type KumoTooltipSide,
  } from "./variants";

  export interface TooltipProps {
    children: Snippet;
    content: Snippet | string;
    side?: KumoTooltipSide;
    align?: KumoTooltipAlign;
    class?: string;
    container?: PortalProps["to"];
    delay?: number;
    closeDelay?: number;
    disabled?: boolean;
  }

  let {
    children,
    content,
    side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side,
    align = "center",
    class: className,
    container,
    delay = 600,
    closeDelay: _closeDelay = 0,
    disabled = false,
  }: TooltipProps = $props();

  const portalContext = getKumoPortalContext();
  let portalContainer = $derived(container ?? portalContext.container);
</script>

<TooltipPrimitive.Root delayDuration={delay} {disabled}>
  <TooltipPrimitive.Trigger
    class="inline-flex cursor-default items-center border-0 bg-transparent p-0 leading-[0] shadow-none"
  >
    {@render children()}
  </TooltipPrimitive.Trigger>
  <TooltipPrimitive.Portal to={portalContainer}>
    <TooltipPrimitive.Content
      {side}
      {align}
      sideOffset={10}
      class={cn(tooltipVariants({ side }), "kumo-tooltip-popup", className)}
    >
      <TooltipPrimitive.Arrow
        class={cn(
          "flex",
          "data-[side=bottom]:top-[-8px]",
          "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
          "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
          "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        )}
      >
        <ArrowSvg />
      </TooltipPrimitive.Arrow>
      {#if typeof content === "string"}
        {content}
      {:else}
        {@render content()}
      {/if}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
</TooltipPrimitive.Root>
