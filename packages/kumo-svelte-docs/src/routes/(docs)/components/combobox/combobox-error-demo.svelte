<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";
  import { databases } from "./combobox-data";
  let value = $state("");
  let open = $state(false);
</script>

<Combobox.Root
  bind:value
  bind:open
  items={databases}
  label="Database"
  error="Please select a database"
  required
>
  <Combobox.TriggerInput placeholder="Select database" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each databases as database}
        <Combobox.Item value={database.value}>{database.label}</Combobox.Item>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
