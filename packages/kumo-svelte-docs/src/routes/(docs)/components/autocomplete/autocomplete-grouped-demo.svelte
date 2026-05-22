<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";
  import { servers } from "./autocomplete-data";
</script>

<Autocomplete.Root>
  <Autocomplete.InputGroup placeholder="Select region…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each servers as region (region.value)}
        <Autocomplete.Group>
          <Autocomplete.GroupLabel>{region.value}</Autocomplete.GroupLabel>
          {#each region.items as item (item.value)}
            <Autocomplete.Item value={item.label} label={item.label}>{item.label}</Autocomplete.Item>
          {/each}
        </Autocomplete.Group>
      {/each}
      <Autocomplete.Empty>No regions found.</Autocomplete.Empty>
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete.Root>
