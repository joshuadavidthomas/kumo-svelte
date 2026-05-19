<script lang="ts">
  import {
    Button,
    CommandPalette,
    CommandPaletteDialog,
    CommandPaletteEmpty,
    CommandPaletteInput,
    CommandPaletteItem,
    CommandPaletteList,
  } from "kumo-svelte";

  const items = ["Copy", "Paste", "Cut", "Delete", "Select All"];
  let open = $state(false);
  let search = $state("");
</script>

<div>
  <Button onclick={() => (open = true)}>Open Simple Palette</Button>

  <CommandPaletteDialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPaletteInput placeholder="Search actions..." />
      <CommandPaletteList>
        {#each items as item}
          <CommandPaletteItem value={item} onSelect={() => (open = false)}>
            {item}
          </CommandPaletteItem>
        {/each}
        <CommandPaletteEmpty>No actions found</CommandPaletteEmpty>
      </CommandPaletteList>
    </CommandPalette>
  </CommandPaletteDialog>
</div>
