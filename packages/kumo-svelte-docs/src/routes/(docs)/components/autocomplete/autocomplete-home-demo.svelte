<script lang="ts">
  import {
    Autocomplete,
    AutocompleteContent,
    AutocompleteInputGroup,
    AutocompleteItem,
    AutocompleteList,
  } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange"];
  const items = fruits.map((fruit) => ({ label: fruit, value: fruit }));
</script>

<Autocomplete {items}>
  <AutocompleteInputGroup placeholder="Search fruits…" />
  <AutocompleteContent>
    <AutocompleteList>
      {#each fruits as fruit (fruit)}
        <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
