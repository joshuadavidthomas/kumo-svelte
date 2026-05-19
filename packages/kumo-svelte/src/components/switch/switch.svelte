<script lang="ts">
  import type { Snippet } from "svelte";
  import Label from "../label/label.svelte";
  import SwitchControl from "./switch-control.svelte";
  import {
    KUMO_SWITCH_DEFAULT_VARIANTS,
    type KumoSwitchSize,
    type SwitchVariant,
  } from "./variants";

  export interface SwitchProps {
    checked?: boolean;
    class?: string;
    controlFirst?: boolean;
    disabled?: boolean;
    id?: string;
    label?: Snippet | string;
    labelTooltip?: Snippet;
    name?: string;
    onCheckedChange?: (checked: boolean) => void;
    required?: boolean;
    size?: KumoSwitchSize;
    transitioning?: boolean;
    value?: string;
    variant?: SwitchVariant;
    "aria-label"?: string;
    "aria-labelledby"?: string;
  }

  let {
    checked = $bindable(false),
    class: className,
    controlFirst = true,
    disabled = false,
    id,
    label,
    labelTooltip,
    name,
    onCheckedChange,
    required,
    size = KUMO_SWITCH_DEFAULT_VARIANTS.size,
    transitioning,
    value,
    variant = KUMO_SWITCH_DEFAULT_VARIANTS.variant,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  }: SwitchProps = $props();

  let ariaLabelFallback = $derived(typeof label === "string" ? label : "Switch");
</script>

{#snippet control()}
  <SwitchControl
    bind:checked
    class={className}
    {disabled}
    {id}
    {name}
    {onCheckedChange}
    {required}
    {size}
    {transitioning}
    {value}
    {variant}
    aria-label={ariaLabel ?? ariaLabelFallback}
    aria-labelledby={ariaLabelledBy}
  />
{/snippet}

{#if label}
  <label
    class={[
      "inline-flex items-center gap-2",
      controlFirst ? "flex-row" : "flex-row-reverse justify-end",
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    ]}
  >
    {@render control()}
    <Label showOptional={required === false} tooltip={labelTooltip} asContent>
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </Label>
  </label>
{:else}
  {@render control()}
{/if}
