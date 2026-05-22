<script lang="ts">
  import { Button, CommandPalette } from "kumo-svelte";

  const groups = [
    { label: "Commands", items: ["Create New Project", "Open Settings", "Search Files"] },
    { label: "Pages", items: ["Home", "Dashboard", "Users"] },
  ];

  let open = $state(false);
  let search = $state("");
</script>

<div class="flex flex-col items-start gap-4">
  <Button onclick={() => (open = true)}>Open Palette (No Autocomplete)</Button>

  <CommandPalette.Dialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPalette.Input placeholder="Search commands..." autocomplete="off" />
      <CommandPalette.List>
        {#each groups as group}
          <CommandPalette.Group value={group.label}>
            <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
            {#each group.items as item}
              <CommandPalette.Item
                value={item}
                onSelect={() => {
                  search = "";
                  open = false;
                }}
              >
                {item}
              </CommandPalette.Item>
            {/each}
          </CommandPalette.Group>
        {/each}
        <CommandPalette.Empty>No commands found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette>
  </CommandPalette.Dialog>
</div>
