<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";
  import { countries, countryItems } from "./autocomplete-data";

  interface Props {
    error?: string;
  }

  let { error }: Props = $props();
</script>

<div class="w-80">
  <Autocomplete
    items={countryItems}
    label="Country"
    description={error ? undefined : "Start typing to filter countries"}
    {error}
    required
  >
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
