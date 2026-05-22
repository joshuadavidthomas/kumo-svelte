<script lang="ts">
  import { Button, CommandPalette } from "kumo-svelte";

  const items = ["Copy", "Paste", "Cut", "Delete", "Select All"];
  let open = $state(false);
  let search = $state("");
</script>

<div>
  <Button onclick={() => (open = true)}>Open Simple Palette</Button>

  <CommandPalette.Dialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPalette.Input placeholder="Search actions..." />
      <CommandPalette.List>
        {#each items as item}
          <CommandPalette.Item value={item} onSelect={() => (open = false)}>
            {item}
          </CommandPalette.Item>
        {/each}
        <CommandPalette.Empty>No actions found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette>
  </CommandPalette.Dialog>
</div>
