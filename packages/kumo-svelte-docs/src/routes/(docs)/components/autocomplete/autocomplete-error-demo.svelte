<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { countries } from "./autocomplete-data";
</script>

<div class="w-80">
  <Autocomplete.Root label="Country" error="Please enter a valid country">
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each countries as country (country.code)}
          <Autocomplete.Item value={country.value} label={country.label}>
            {country.label}
          </Autocomplete.Item>
        {/each}
        <Autocomplete.Empty>No countries found.</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
</div>
