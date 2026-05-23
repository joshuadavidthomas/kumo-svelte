<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";

  const servers = [
    {
      value: "North America",
      items: [
        { label: "US East", value: "us-east" },
        { label: "US West", value: "us-west" },
        { label: "Canada", value: "canada" },
      ],
    },
    {
      value: "Europe",
      items: [
        { label: "Germany", value: "germany" },
        { label: "France", value: "france" },
        { label: "United Kingdom", value: "uk" },
      ],
    },
  ];
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
