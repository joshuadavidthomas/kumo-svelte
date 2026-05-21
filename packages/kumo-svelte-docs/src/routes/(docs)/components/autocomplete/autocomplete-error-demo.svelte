<script lang="ts">
  import {
    Autocomplete,
    AutocompleteContent,
    AutocompleteInputGroup,
    AutocompleteItem,
    AutocompleteList,
  } from "kumo-svelte";
  import { countries, countryItems } from "./autocomplete-data";
</script>

<div class="w-80">
  <Autocomplete items={countryItems} label="Country" error="Please enter a valid country">
    <AutocompleteInputGroup placeholder="Search countries…" />
    <AutocompleteContent>
      <AutocompleteList>
        {#each countries as country (country.code)}
          <AutocompleteItem value={country.value}>{country.label}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
</div>
