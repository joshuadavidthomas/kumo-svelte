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

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete items={fruitItems}>
    <AutocompleteInputGroup size="xs" placeholder="xs" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each fruits as fruit (fruit)}
          <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <AutocompleteInputGroup size="sm" placeholder="sm" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each fruits as fruit (fruit)}
          <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <AutocompleteInputGroup size="base" placeholder="base (default)" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each fruits as fruit (fruit)}
          <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
  <Autocomplete items={fruitItems}>
    <AutocompleteInputGroup size="lg" placeholder="lg" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each fruits as fruit (fruit)}
          <AutocompleteItem value={fruit}>{fruit}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
</div>
