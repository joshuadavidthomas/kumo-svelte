<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";

  const databases = [
    { value: "postgres", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redis", label: "Redis" },
    { value: "sqlite", label: "SQLite" },
    { value: "d1", label: "Cloudflare D1" },
  ];

  let value = $state("");
  let open = $state(false);
</script>

<Combobox.Root
  bind:value
  bind:open
  label="Database"
  description="Select your preferred database"
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
