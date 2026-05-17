<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import { getSwitchGroupContext } from "./context";
  import SwitchControl from "./switch-control.svelte";
  import {
    KUMO_SWITCH_DEFAULT_VARIANTS,
    type KumoSwitchSize,
    type SwitchVariant,
  } from "./variants";

  export interface SwitchItemProps {
    checked?: boolean;
    class?: string;
    disabled?: boolean;
    id?: string;
    label: Snippet | string;
    onCheckedChange?: (checked: boolean) => void;
    size?: KumoSwitchSize;
    transitioning?: boolean;
    variant?: SwitchVariant;
  }

  let {
    checked = $bindable(false),
    class: className,
    disabled = false,
    id,
    label,
    onCheckedChange,
    size = KUMO_SWITCH_DEFAULT_VARIANTS.size,
    transitioning,
    variant = KUMO_SWITCH_DEFAULT_VARIANTS.variant,
  }: SwitchItemProps = $props();

  const group = getSwitchGroupContext();
  let controlFirst = $derived(group?.controlFirst ?? true);
  let ariaLabel = $derived(typeof label === "string" ? label : "Switch");
</script>

<label
  class={cn(
    "m-0 relative inline-flex items-center gap-2",
    !controlFirst && "flex-row-reverse justify-end",
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    className,
  )}
>
  <SwitchControl
    bind:checked
    {disabled}
    {id}
    {onCheckedChange}
    {size}
    {transitioning}
    {variant}
    aria-label={ariaLabel}
  />
  <span class="text-base font-medium text-kumo-default">
    {#if typeof label === "string"}
      {label}
    {:else}
      {@render label()}
    {/if}
  </span>
</label>
