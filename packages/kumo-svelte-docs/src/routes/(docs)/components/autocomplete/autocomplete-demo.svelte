<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";
  import { fruits, fruitItems } from "./autocomplete-data";
</script>

<Autocomplete items={fruitItems}>
  <AutocompleteInputGroup placeholder="Search fruits…" />
  <AutocompleteContent>
    <AutocompleteList>
      {#each fruits as fruit (fruit)}
        <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
