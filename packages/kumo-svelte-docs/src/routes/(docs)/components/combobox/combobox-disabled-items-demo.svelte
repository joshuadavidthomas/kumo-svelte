<script lang="ts">
  import { Text } from "kumo-svelte/components/text";
  import * as Combobox from "kumo-svelte/components/combobox";

  const disabledDatabases = [
    { value: "postgres", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "mariadb", label: "MariaDB", disabled: true, reason: "Beta" },
    { value: "redis", label: "Redis" },
    { value: "d1", label: "Cloudflare D1" },
  ];

  let value = $state("");
  let open = $state(false);
</script>

<div class="w-80">
<Combobox.Root bind:value bind:open>
  <Combobox.TriggerInput placeholder="Select database" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#each disabledDatabases as item}
        <Combobox.Item value={item.value} disabled={item.disabled}>
          {item.label}
          {#if item.reason}
            <Text variant="secondary" size="xs" as="span"> — {item.reason}</Text>
          {/if}
        </Combobox.Item>
      {/each}
    </Combobox.List>
  </Combobox.Content>
</Combobox.Root>
</div>
