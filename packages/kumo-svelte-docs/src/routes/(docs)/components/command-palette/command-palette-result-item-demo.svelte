<script lang="ts">
  import {
    Button,
    CommandPalette,
    CommandPaletteDialog,
    CommandPaletteEmpty,
    CommandPaletteFooter,
    CommandPaletteInput,
    CommandPaletteList,
    CommandPaletteResultItem,
  } from "kumo-svelte";
  import FileIcon from "phosphor-svelte/lib/FileIcon";

  const results = [
    { value: "button", title: "Button", breadcrumbs: ["Components"] },
    { value: "dialog", title: "Dialog", breadcrumbs: ["Components"] },
    { value: "page-header", title: "Page Header", breadcrumbs: ["Blocks"] },
  ];

  let open = $state(false);
  let search = $state("");
</script>

{#snippet fileIcon()}
  <FileIcon size={16} />
{/snippet}

<div>
  <Button onclick={() => (open = true)}>Open with ResultItem</Button>

  <CommandPaletteDialog bind:open>
    <CommandPalette bind:value={search}>
      <CommandPaletteInput placeholder="Search documentation..." />
      <CommandPaletteList>
        {#each results as result}
          <CommandPaletteResultItem
            value={result.title}
            title={result.title}
            breadcrumbs={result.breadcrumbs}
            icon={fileIcon}
            onSelect={() => (open = false)}
          />
        {/each}
        <CommandPaletteEmpty>No pages found</CommandPaletteEmpty>
      </CommandPaletteList>
      <CommandPaletteFooter>
        <span class="flex items-center gap-2">
          <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↑↓</kbd>
          <span>Navigate</span>
        </span>
        <span class="flex items-center gap-2">
          <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">⌘↵</kbd>
          <span>Open in new tab</span>
        </span>
      </CommandPaletteFooter>
    </CommandPalette>
  </CommandPaletteDialog>
</div>
