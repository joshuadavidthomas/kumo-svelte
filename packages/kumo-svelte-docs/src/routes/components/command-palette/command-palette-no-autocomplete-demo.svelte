<script lang="ts">
  import {
    Button,
    CommandPalette,
    CommandPaletteDialog,
    CommandPaletteEmpty,
    CommandPaletteGroup,
    CommandPaletteGroupLabel,
    CommandPaletteInput,
    CommandPaletteItem,
    CommandPaletteList,
  } from "kumo-svelte";

  const groups = [
    { label: "Commands", items: ["Create New Project", "Open Settings", "Search Files"] },
    { label: "Pages", items: ["Home", "Dashboard", "Users"] },
  ];

  let open = $state(false);
  let search = $state("");
</script>

<div class="flex flex-col items-start gap-4">
  <Button onclick={() => (open = true)}>Open Palette (No Autocomplete)</Button>

  <CommandPaletteDialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPaletteInput placeholder="Search commands..." autocomplete="off" />
      <CommandPaletteList>
        {#each groups as group}
          <CommandPaletteGroup value={group.label}>
            <CommandPaletteGroupLabel>{group.label}</CommandPaletteGroupLabel>
            {#each group.items as item}
              <CommandPaletteItem
                value={item}
                onSelect={() => {
                  search = "";
                  open = false;
                }}
              >
                {item}
              </CommandPaletteItem>
            {/each}
          </CommandPaletteGroup>
        {/each}
        <CommandPaletteEmpty>No commands found</CommandPaletteEmpty>
      </CommandPaletteList>
    </CommandPalette>
  </CommandPaletteDialog>
</div>
