<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { countries, countryItems } from "./autocomplete-data";
</script>

<div class="w-80">
  <Autocomplete.Root items={countryItems} label="Country" error="Please enter a valid country">
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each countries as country (country.code)}
          <Autocomplete.Item value={country.value}>{country.label}</Autocomplete.Item>
        {/each}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
</div>
