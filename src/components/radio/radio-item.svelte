<script lang="ts">
  import type { Snippet } from "svelte";
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getRadioGroupContext } from "./context";
  import {
    KUMO_RADIO_DEFAULT_VARIANTS,
    type KumoRadioAppearance,
    type RadioControlPosition,
    type RadioVariant,
  } from "./variants";

  export interface RadioItemProps {
    appearance?: KumoRadioAppearance;
    class?: string;
    description?: Snippet | string;
    disabled?: boolean;
    id?: string;
    label: Snippet | string;
    value: string;
    variant?: RadioVariant;
  }

  let {
    appearance: appearanceProp,
    class: className,
    description,
    disabled = false,
    id,
    label,
    value,
    variant = KUMO_RADIO_DEFAULT_VARIANTS.variant,
  }: RadioItemProps = $props();

  const group = getRadioGroupContext();
  let appearance = $derived(appearanceProp ?? group.appearance);
  let isCard = $derived(appearance === "card");
  let effectiveControlPosition: RadioControlPosition = $derived(
    group.controlPosition ?? (isCard ? "end" : "start"),
  );
</script>

{#snippet control()}
  <RadioGroupPrimitive.Item
    {id}
    {value}
    {disabled}
    class={cn(
      "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring focus:outline-none",
      !isCard && "after:absolute after:-inset-x-3 after:-inset-y-2",
      variant === "error" ? "ring-kumo-danger" : isCard ? "ring-kumo-line" : "ring-kumo-line",
      !disabled &&
        variant !== "error" &&
        "group-hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3",
      !disabled &&
        variant === "error" &&
        "focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3",
      "data-[state=checked]:bg-kumo-contrast",
      isCard && "mt-0.5 ring-2",
    )}
  >
    {#snippet children({ checked })}
      <span class={cn("h-2 w-2 rounded-full bg-kumo-base", !checked && "invisible")}></span>
    {/snippet}
  </RadioGroupPrimitive.Item>
{/snippet}

{#if isCard}
  <label
    class={cn(
      "m-0 group relative flex items-start gap-3 rounded-lg border border-kumo-hairline bg-kumo-base p-3 transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      effectiveControlPosition === "start" && "flex-row-reverse",
      variant === "error" &&
        "border-kumo-danger has-[[data-state=checked]]:border-kumo-danger has-[[data-state=checked]]:bg-kumo-base",
      disabled
        ? "cursor-not-allowed opacity-50"
        : cn(
            "cursor-pointer",
            variant !== "error" && "hover:bg-kumo-tint has-[[data-state=checked]]:border-kumo-interact has-[[data-state=checked]]:bg-kumo-tint",
          ),
      className,
    )}
  >
    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="text-base font-medium text-kumo-default">
        {#if typeof label === "string"}
          {label}
        {:else}
          {@render label()}
        {/if}
      </span>
      {#if description}
        <span class="text-sm text-kumo-subtle">
          {#if typeof description === "string"}
            {description}
          {:else}
            {@render description()}
          {/if}
        </span>
      {/if}
    </div>
    {@render control()}
  </label>
{:else}
  <label
    class={cn(
      "m-0 group relative inline-flex items-center gap-2",
      effectiveControlPosition === "end" && "flex-row-reverse justify-end",
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      className,
    )}
  >
    {@render control()}
    <span class="text-base text-kumo-default">
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </span>
  </label>
{/if}
