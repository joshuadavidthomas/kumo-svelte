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
    CommandPaletteLoading,
  } from "kumo-svelte";

  const groups = [
    { label: "Commands", items: ["Create New Project", "Open Settings", "Search Files"] },
    { label: "Pages", items: ["Home", "Dashboard", "Users"] },
  ];

  let open = $state(false);
  let loading = $state(false);
  let search = $state("");

  function handleOpen() {
    open = true;
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1500);
  }
</script>

<div>
  <Button onclick={handleOpen}>Open with Loading</Button>

  <CommandPaletteDialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPaletteInput placeholder="Search..." />
      <CommandPaletteList>
        {#if loading}
          <CommandPaletteLoading />
        {:else}
          {#each groups as group}
            <CommandPaletteGroup value={group.label}>
              <CommandPaletteGroupLabel>{group.label}</CommandPaletteGroupLabel>
              {#each group.items as item}
                <CommandPaletteItem value={item} onSelect={() => (open = false)}>
                  {item}
                </CommandPaletteItem>
              {/each}
            </CommandPaletteGroup>
          {/each}
          <CommandPaletteEmpty>No results found</CommandPaletteEmpty>
        {/if}
      </CommandPaletteList>
    </CommandPalette>
  </CommandPaletteDialog>
</div>
