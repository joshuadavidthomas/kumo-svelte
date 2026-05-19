<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerValue } from "kumo-svelte";

  const groups = [
    { label: "Asia", items: [{ value: "japan", label: "Japan" }, { value: "singapore", label: "Singapore" }] },
    { label: "Europe", items: [{ value: "germany", label: "Germany" }, { value: "france", label: "France" }] },
    { label: "North America", items: [{ value: "us-east", label: "United States (East)" }, { value: "canada", label: "Canada" }] },
  ];
  const items = groups.flatMap((group) => group.items);
  let value = $state("japan");
  let open = $state(false);
  let selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Combobox bind:value bind:open {items}>
  <ComboboxTriggerValue class="w-[240px]">{selectedLabel}</ComboboxTriggerValue>
  <ComboboxContent>
    <ComboboxInput placeholder="Search locations" />
    <ComboboxList>
      {#each groups as group}
        <ComboboxGroup>
          <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
          {#each group.items as item}
            <ComboboxItem value={item.value}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxGroup>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
