<script lang="ts">
  import {
    CommandPalette,
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

  let search = $state("");
</script>

<div class="w-full max-w-xl rounded-lg border border-kumo-hairline shadow-sm">
  <CommandPalette bind:value={search}>
    <CommandPaletteInput placeholder="Search inline commands..." />
    <CommandPaletteList>
      {#each groups as group}
        <CommandPaletteGroup value={group.label}>
          <CommandPaletteGroupLabel>{group.label}</CommandPaletteGroupLabel>
          {#each group.items as item}
            <CommandPaletteItem value={item}>{item}</CommandPaletteItem>
          {/each}
        </CommandPaletteGroup>
      {/each}
      <CommandPaletteEmpty>No commands found</CommandPaletteEmpty>
    </CommandPaletteList>
  </CommandPalette>
</div>
