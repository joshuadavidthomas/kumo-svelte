<script lang="ts">
  import { Meter as MeterPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { meterVariants } from "./variants";

  export interface MeterProps {
    value?: number;
    min?: number;
    max?: number;
    customValue?: string;
    label: string;
    showValue?: boolean;
    class?: string;
    trackClass?: string;
    indicatorClass?: string;
    id?: string;
  }

  let {
    value = 0,
    min = 0,
    max = 100,
    customValue,
    label,
    showValue = true,
    class: className,
    trackClass,
    indicatorClass,
    id,
  }: MeterProps = $props();

  let boundedValue = $derived(Math.min(Math.max(value, min), max));
  let range = $derived(Math.max(max - min, 1));
  let percentage = $derived(((boundedValue - min) / range) * 100);
  let formattedValue = $derived(`${Math.round(percentage)}%`);
</script>

<MeterPrimitive.Root
  {id}
  value={boundedValue}
  {min}
  {max}
  class={cn(meterVariants(), className)}
>
  <div class="flex items-center justify-between gap-4">
    <span class="text-xs text-kumo-subtle">{label}</span>
    {#if customValue}
      <span class="text-sm font-medium text-kumo-default tabular-nums">
        {customValue}
      </span>
    {:else if showValue}
      <span class="text-sm font-medium text-kumo-default tabular-nums">
        {formattedValue}
      </span>
    {/if}
  </div>
  <div
    class={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-kumo-fill",
      trackClass,
    )}
  >
    <div
      class={cn(
        "absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-kumo-brand via-kumo-brand to-kumo-brand transition-[width] duration-300 ease-out",
        indicatorClass,
      )}
      style={`width: ${percentage}%`}
    ></div>
  </div>
</MeterPrimitive.Root>
