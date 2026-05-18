<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";

  const fruits = ["Apple", "Banana", "Blackberry", "Blueberry", "Cherry", "Grape"];
  const fruitItems = fruits.map((fruit) => ({ label: fruit, value: fruit }));

  let value = $state("");
</script>

<div class="flex flex-col gap-3 w-80">
  <Autocomplete items={fruitItems} bind:value>
    <AutocompleteInputGroup placeholder="Type a fruit…" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each fruits as fruit (fruit)}
          <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
  {#if value}
    <p class="text-muted">Current value: <code>{value}</code></p>
  {/if}
</div>
