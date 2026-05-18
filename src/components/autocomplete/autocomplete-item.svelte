<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import { Combobox as ComboboxPrimitive } from "bits-ui";

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
</script>

<ComboboxPrimitive.Item
  data-slot="autocomplete-item"
  {value}
  label={label ?? value}
  {disabled}
  class="group mx-1.5 grid cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-base outline-none data-[highlighted]:bg-kumo-overlay data-[selected]:font-medium"
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
      data-slot="autocomplete-item-indicator"
      class="col-start-2 hidden items-center group-data-selected:flex"
    >
      {#if selected}
        <CheckIcon aria-hidden="true" size={14} />
      {/if}
    </span>
  {/snippet}
</ComboboxPrimitive.Item>
