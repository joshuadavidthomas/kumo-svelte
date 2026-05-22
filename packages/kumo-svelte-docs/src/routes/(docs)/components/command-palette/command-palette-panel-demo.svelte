<script lang="ts">
  import * as CommandPalette from "kumo-svelte/components/command-palette";
  const groups = [
    { label: "Commands", items: ["Create New Project", "Open Settings", "Search Files"] },
    { label: "Pages", items: ["Home", "Dashboard", "Users"] },
  ];

  let search = $state("");
</script>

<div class="w-full max-w-xl rounded-lg border border-kumo-hairline shadow-sm">
  <CommandPalette.Root bind:value={search}>
    <CommandPalette.Input placeholder="Search inline commands..." />
    <CommandPalette.List>
      {#each groups as group}
        <CommandPalette.Group value={group.label}>
          <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
          {#each group.items as item}
            <CommandPalette.Item value={item}>{item}</CommandPalette.Item>
          {/each}
        </CommandPalette.Group>
      {/each}
      <CommandPalette.Empty>No commands found</CommandPalette.Empty>
    </CommandPalette.List>
  </CommandPalette.Root>
</div>
