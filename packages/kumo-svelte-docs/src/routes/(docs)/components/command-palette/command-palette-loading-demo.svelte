<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as CommandPalette from "kumo-svelte/components/command-palette";
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

  <CommandPalette.Dialog bind:open>
    <CommandPalette.Root bind:value={search}>
      <CommandPalette.Input placeholder="Search..." />
      <CommandPalette.List>
        {#if loading}
          <CommandPalette.Loading />
        {:else}
          {#each groups as group}
            <CommandPalette.Group value={group.label}>
              <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
              {#each group.items as item}
                <CommandPalette.Item value={item} onSelect={() => (open = false)}>
                  {item}
                </CommandPalette.Item>
              {/each}
            </CommandPalette.Group>
          {/each}
          <CommandPalette.Empty>No results found</CommandPalette.Empty>
        {/if}
      </CommandPalette.List>
    </CommandPalette.Root>
  </CommandPalette.Dialog>
</div>
