<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { KumoTooltipSide } from "../tooltip";
  import Button, { type ButtonProps } from "../button/button.svelte";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { getInputGroupContext, type InputGroupFocusMode } from "./context";
  import type { KumoButtonSize } from "../button";

  const COMPACT_BUTTON_SIZE: Record<KumoButtonSize, KumoButtonSize> = {
    xs: "xs",
    sm: "xs",
    base: "sm",
    lg: "base",
  };

  export interface InputGroupButtonProps extends ButtonProps {
    children?: Snippet;
    tooltip?: Snippet | string;
    tooltipSide?: KumoTooltipSide;
  }

  let {
    children,
    class: className,
    disabled,
    size,
    tooltip,
    tooltipSide = "bottom",
    variant = "ghost",
    ...restProps
  }: InputGroupButtonProps = $props();

  const group = getInputGroupContext("Button");
  const portalContext = getKumoPortalContext();
  let focusMode = $derived<InputGroupFocusMode>(group?.focusMode ?? "container");
  let isIndividual = $derived(focusMode === "individual");
  let buttonSize = $derived(size ?? (isIndividual ? (group?.size ?? "sm") : COMPACT_BUTTON_SIZE[group?.size ?? "base"]));
  let buttonDisabled = $derived(disabled ?? group?.disabled);
  let tooltipAriaLabel = $derived(
    restProps["aria-label"] ?? (typeof tooltip === "string" ? tooltip : undefined),
  );

  let buttonClass = $derived(
    cn(
      "pointer-events-auto",
      isIndividual && [
        "relative h-full! rounded-none border border-kumo-line ring-0",
        "first:rounded-l-[inherit] last:rounded-r-[inherit]",
        "not-first:border-l-0",
        "hover:z-[1]",
        "focus:z-[2] focus:-outline-offset-1 focus:outline focus-visible:ring-2 focus-visible:ring-kumo-focus",
        "disabled:bg-kumo-overlay disabled:text-kumo-inactive!",
      ],
      className,
    ),
  );
</script>

{#snippet control(props: Record<string, unknown> = {})}
  <Button
    {...props}
    {...restProps}
    type="button"
    disabled={buttonDisabled}
    aria-label={tooltipAriaLabel}
    {variant}
    size={buttonSize}
    class={buttonClass}
  >
    {@render children?.()}
  </Button>
{/snippet}

{#if tooltip}
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger>
      {#snippet child({ props })}
        {@render control(props)}
      {/snippet}
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal to={portalContext.container}>
      <TooltipPrimitive.Content
        side={tooltipSide}
        sideOffset={8}
        class={cn(
          "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default",
          "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
        )}
      >
        {#if typeof tooltip === "string"}
          {tooltip}
        {:else}
          {@render tooltip()}
        {/if}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
{:else}
  {@render control()}
{/if}
