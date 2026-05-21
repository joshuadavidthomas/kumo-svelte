<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getComboboxContext } from "./context";

  export interface ComboboxItemProps {
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
  }: ComboboxItemProps = $props();

  const context = getComboboxContext("Item");
  let visible = $derived(context.shouldShowItem(value, label));
</script>

{#if visible}
  <ComboboxPrimitive.Item
    data-slot="combobox-item"
    {value}
    label={label ?? value}
    {disabled}
    class={cn(
      "group mx-1.5 grid cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-base outline-none hover:bg-kumo-tint data-[highlighted]:bg-kumo-tint",
      "data-[disabled]:cursor-not-allowed data-[disabled]:text-kumo-subtle data-[disabled]:opacity-60 data-[disabled]:data-[highlighted]:bg-transparent",
      className,
    )}
  >
    {#snippet children({ selected })}
      <div class="col-start-1 min-w-0 truncate">
        {#if childrenProp}
          {@render childrenProp()}
        {:else}
          {label ?? value}
        {/if}
      </div>
      <span
        data-slot="combobox-item-indicator"
        class={cn("col-start-2 flex items-center", !selected && "invisible")}
      >
        <CheckIcon aria-hidden="true" size={16} />
      </span>
    {/snippet}
  </ComboboxPrimitive.Item>
{/if}
