<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface SelectOptionProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    label?: string;
    value: string;
  }

  let {
    children: childrenProp,
    class: className,
    disabled = false,
    label,
    value,
  }: SelectOptionProps = $props();
</script>

<SelectPrimitive.Item
  data-slot="select-item"
  {value}
  label={label ?? value}
  {disabled}
  class={cn(
    "group mx-1.5 flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-base outline-none",
    "focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:ring-inset",
    "data-[highlighted]:bg-kumo-tint",
    "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    className,
  )}
>
  {#snippet children({ selected })}
    <span class="min-w-0 truncate">
      {#if childrenProp}
        {@render childrenProp()}
      {:else}
        {label ?? value}
      {/if}
    </span>
    <span class={cn("ml-auto inline-flex", !selected && "invisible")}>
      <CheckIcon aria-hidden="true" size={16} weight="bold" />
    </span>
  {/snippet}
</SelectPrimitive.Item>
