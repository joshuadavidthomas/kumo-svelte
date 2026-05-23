<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";

  const countries = [
    { code: "us", label: "United States", value: "United States" },
    { code: "gb", label: "United Kingdom", value: "United Kingdom" },
    { code: "de", label: "Germany", value: "Germany" },
    { code: "fr", label: "France", value: "France" },
    { code: "jp", label: "Japan", value: "Japan" },
  ];
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
