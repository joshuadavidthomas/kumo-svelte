<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";
  import { servers } from "./combobox-data";

  const items = servers.flatMap((group) => group.items);
  let value = $state("");
  let open = $state(false);
</script>

<Combobox.Root bind:value bind:open {items}>
  <Combobox.TriggerInput class="w-[200px]" placeholder="Select server" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each servers as group}
        <Combobox.Group>
          <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
          {#each group.items as item}
            <Combobox.Item value={item.value}>{item.label}</Combobox.Item>
          {/each}
        </Combobox.Group>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
