<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";
  import { fruits, fruitItems } from "./autocomplete-data";

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
    <p class="text-sm text-kumo-subtle">Value: <span class="font-medium text-kumo-default">{value}</span></p>
  {/if}
</div>
