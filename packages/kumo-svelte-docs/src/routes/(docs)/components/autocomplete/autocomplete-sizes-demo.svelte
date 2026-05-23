<script lang="ts">
  import * as Autocomplete from "kumo-svelte/components/autocomplete";

  const fruits = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Mango"];
</script>

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete.Root>
    <Autocomplete.InputGroup size="xs" placeholder="xs" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
        <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
  <Autocomplete.Root>
    <Autocomplete.InputGroup size="sm" placeholder="sm" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
        <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
  <Autocomplete.Root>
    <Autocomplete.InputGroup size="base" placeholder="base (default)" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
        <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
  <Autocomplete.Root>
    <Autocomplete.InputGroup size="lg" placeholder="lg" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#each fruits as fruit (fruit)}
          <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>
        {/each}
        <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete.Root>
</div>
