<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as CommandPalette from "kumo-svelte/components/command-palette";
  import ChartLineIcon from "phosphor-svelte/lib/ChartLineIcon";
  import FolderIcon from "phosphor-svelte/lib/FolderIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import UsersIcon from "phosphor-svelte/lib/UsersIcon";

  const groups = [
    {
      label: "Commands",
      items: [
        { value: "create-new-project", title: "Create New Project", icon: FolderIcon },
        { value: "open-settings", title: "Open Settings", icon: GearIcon },
        { value: "search-files", title: "Search Files", icon: MagnifyingGlassIcon },
      ],
    },
    {
      label: "Pages",
      items: [
        { value: "home", title: "Home", icon: HouseIcon },
        { value: "dashboard", title: "Dashboard", icon: ChartLineIcon },
        { value: "users", title: "Users", icon: UsersIcon },
      ],
    },
  ];

  let open = $state(false);
  let search = $state("");
  let selectedItem = $state<string | null>(null);

  function handleSelect(title: string) {
    selectedItem = title;
    search = "";
    open = false;
  }
</script>

<div class="flex flex-col items-start gap-4">
  <Button onclick={() => (open = true)}>Open Command Palette</Button>
  {#if selectedItem}
    <p class="text-sm text-kumo-subtle">
      Last selected: <span class="text-kumo-default">{selectedItem}</span>
    </p>
  {/if}

  <CommandPalette.Dialog bind:open>
    <CommandPalette.Root bind:value={search}>
      <CommandPalette.Input placeholder="Type a command or search..." />
      <CommandPalette.List>
        {#each groups as group}
          <CommandPalette.Group value={group.label}>
            <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
            {#each group.items as item}
              {@const Icon = item.icon}
              <CommandPalette.Item value={item.title} onSelect={() => handleSelect(item.title)}>
                <span class="flex items-center gap-3">
                  <span class="text-kumo-subtle"><Icon size={16} /></span>
                  <span>{item.title}</span>
                </span>
              </CommandPalette.Item>
            {/each}
          </CommandPalette.Group>
        {/each}
        <CommandPalette.Empty>No commands found</CommandPalette.Empty>
      </CommandPalette.List>
      <CommandPalette.Footer>
        <span class="flex items-center gap-2">
          <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↑↓</kbd>
          <span>Navigate</span>
        </span>
        <span class="flex items-center gap-2">
          <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↵</kbd>
          <span>Select</span>
        </span>
      </CommandPalette.Footer>
    </CommandPalette.Root>
  </CommandPalette.Dialog>
</div>
