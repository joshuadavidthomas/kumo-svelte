<script lang="ts">
  import { Autocomplete } from "kumo-svelte";
  import { servers, serverItems } from "./autocomplete-data";
</script>

<Autocomplete items={serverItems}>
  <Autocomplete.InputGroup placeholder="Select region…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#each servers as region (region.value)}
        <Autocomplete.Group>
          <Autocomplete.GroupLabel>{region.value}</Autocomplete.GroupLabel>
          {#each region.items as item (item.value)}
            <Autocomplete.Item value={item.label}>{item.label}</Autocomplete.Item>
          {/each}
        </Autocomplete.Group>
      {/each}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
