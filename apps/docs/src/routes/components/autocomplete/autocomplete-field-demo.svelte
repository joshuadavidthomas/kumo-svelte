<script lang="ts">
  import {
      Autocomplete,
      AutocompleteContent,
      AutocompleteInputGroup,
      AutocompleteItem,
      AutocompleteList,
  } from "kumo-svelte";

  interface Props {
    error?: string;
  }

  let { error }: Props = $props();

  const countries = [
    { code: "us", label: "United States", value: "United States" },
    { code: "ca", label: "Canada", value: "Canada" },
    { code: "gb", label: "United Kingdom", value: "United Kingdom" },
    { code: "de", label: "Germany", value: "Germany" },
    { code: "jp", label: "Japan", value: "Japan" },
  ];
  const countryItems = countries.map((country) => ({ label: country.label, value: country.value }));
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
