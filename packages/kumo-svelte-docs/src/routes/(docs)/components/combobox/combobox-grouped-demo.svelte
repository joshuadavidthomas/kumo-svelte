<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";
  import { servers } from "./combobox-data";

  const items = servers.flatMap((group) => group.items);
  let value = $state("");
  let open = $state(false);
</script>

<Combobox bind:value bind:open {items}>
  <ComboboxTriggerInput class="w-[200px]" placeholder="Select server" />
  <ComboboxContent>
    <ComboboxEmpty />
    <ComboboxList>
      {#each servers as group}
        <ComboboxGroup>
          <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
          {#each group.items as item}
            <ComboboxItem value={item.value}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxGroup>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
