<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { countries, countryItems } from "./autocomplete-data";

  interface Props {
    error?: string;
  }

  let { error }: Props = $props();
</script>

<div class="w-80">
  <Autocomplete.Root
    items={countryItems}
    label="Country"
    description={error ? undefined : "Start typing to filter countries"}
    {error}
    required
  >
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
