<script lang="ts">
  import { TableOfContents, TableOfContentsItem, TableOfContentsList } from "kumo-svelte";

  const headings = ["Introduction", "Installation", "Usage"];
  let clicked = $state("");
</script>

<div class="min-w-48 space-y-3">
  <TableOfContents>
    <TableOfContentsList>
      {#each headings as heading}
        <TableOfContentsItem active={heading === "Introduction"} onclick={() => (clicked = heading)}>
          {#snippet child({ props })}
            <button {...props} type="button" onclick={() => (clicked = heading)}><span class="block min-w-0 leading-5">{heading}</span></button>
          {/snippet}
        </TableOfContentsItem>
      {/each}
    </TableOfContentsList>
  </TableOfContents>
  {#if clicked}<p class="text-xs text-kumo-subtle">Clicked: {clicked}</p>{/if}
</div>
