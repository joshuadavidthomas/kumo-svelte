<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";
  import { databases } from "./combobox-data";

  let value = $state("");
  let open = $state(false);
</script>

<Combobox
  bind:value
  bind:open
  items={databases}
  label="Database"
  description="Select your preferred database"
>
  <ComboboxTriggerInput placeholder="Select database" />
  <ComboboxContent>
    <ComboboxEmpty />
    <ComboboxList>
      {#each databases as database}
        <ComboboxItem value={database.value}>{database.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
