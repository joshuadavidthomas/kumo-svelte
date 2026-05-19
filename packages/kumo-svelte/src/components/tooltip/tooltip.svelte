<script lang="ts">
  import type { Snippet } from "svelte";
  import type { PortalProps } from "bits-ui";
  import TooltipContent from "./tooltip-content.svelte";
  import TooltipRoot from "./tooltip-root.svelte";
  import TooltipTrigger from "./tooltip-trigger.svelte";
  import {
    KUMO_TOOLTIP_DEFAULT_VARIANTS,
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
</script>

<TooltipRoot delayDuration={delay} {disabled}>
  <TooltipTrigger
    class="inline-flex cursor-default items-center border-0 bg-transparent p-0 leading-[0] shadow-none"
  >
    {#snippet child({ props })}
      <span
        {...props}
        class="inline-flex cursor-default items-center border-0 bg-transparent p-0 leading-[0] shadow-none"
      >
        {@render children()}
      </span>
    {/snippet}
  </TooltipTrigger>
  <TooltipContent {side} {align} {container} class={className}>
    {#if typeof content === "string"}
      {content}
    {:else}
      {@render content()}
    {/if}
  </TooltipContent>
</TooltipRoot>
