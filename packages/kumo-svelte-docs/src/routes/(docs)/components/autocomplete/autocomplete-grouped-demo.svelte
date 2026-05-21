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
  import { servers, serverItems } from "./autocomplete-data";
</script>

<Autocomplete items={serverItems}>
  <AutocompleteInputGroup placeholder="Select region…" />
  <AutocompleteContent>
    <AutocompleteList>
      {#each servers as region (region.value)}
        <AutocompleteGroup>
          <AutocompleteGroupLabel>{region.value}</AutocompleteGroupLabel>
          {#each region.items as item (item.value)}
            <AutocompleteItem value={item.label}>{item.label}</AutocompleteItem>
          {/each}
        </AutocompleteGroup>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
