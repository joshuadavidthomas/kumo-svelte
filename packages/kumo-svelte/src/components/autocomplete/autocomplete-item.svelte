<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getAutocompleteContext } from "./context";

  export interface AutocompleteItemProps {
    children?: Snippet;
    disabled?: boolean;
    label?: string;
    value: string;
  }

  let {
    children: childrenProp,
    disabled = false,
    label,
    value,
  }: AutocompleteItemProps = $props();

  const context = getAutocompleteContext("Item");
  const itemId = $props.id();
  let visible = $derived(context.shouldShowItem(value, label));

  const visibleItemAction: Action<HTMLElement> = () => {
    const unregister = context.registerVisibleItem(itemId);
    return { destroy: unregister };
  };
</script>

{#if visible}
  <ComboboxPrimitive.Item
    data-slot="autocomplete-item"
    {value}
    label={label ?? value}
    {disabled}
    class={cn(
      "group mx-1.5 grid cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-base data-[highlighted]:bg-kumo-overlay data-[selected]:font-medium",
    )}
  >
    {#snippet children({ selected })}
      <div use:visibleItemAction class="col-start-1">
        {#if childrenProp}
          {@render childrenProp()}
        {:else}
          {label ?? value}
        {/if}
      </div>
      <span
        data-slot="autocomplete-item-indicator"
        class="col-start-2 hidden items-center group-data-selected:flex"
      >
        {#if selected}
          <CheckIcon aria-hidden="true" size={14} />
        {/if}
      </span>
    {/snippet}
  </ComboboxPrimitive.Item>
{/if}
