<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Blackberry", "Blueberry", "Cherry", "Grape", "Lemon", "Orange", "Peach", "Pear", "Pineapple", "Strawberry"];
  const fruitItems = fruits.map((fruit) => ({ label: fruit, value: fruit }));
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
