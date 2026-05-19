<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteGroup,
      AutocompleteGroupLabel,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";

  const regions = [
    { label: "North America", items: ["East US", "West US", "Canada Central"] },
    { label: "Europe", items: ["Western Europe", "Northern Europe", "Germany West Central"] },
  ];
  const regionItems = regions.flatMap((region) => region.items.map((item) => ({ label: item, value: item })));
</script>

<Autocomplete items={regionItems}>
  <AutocompleteInputGroup placeholder="Select region…" />
  <AutocompleteContent>
    <AutocompleteList>
      {#each regions as region (region.label)}
        <AutocompleteGroup>
          <AutocompleteGroupLabel>{region.label}</AutocompleteGroupLabel>
          {#each region.items as item (item)}
            <AutocompleteItem value={item}>{item}</AutocompleteItem>
          {/each}
        </AutocompleteGroup>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
