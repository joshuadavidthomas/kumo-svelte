<script lang="ts">
  import { TableOfContents, TableOfContentsItem, TableOfContentsList, TableOfContentsTitle } from "kumo-svelte";

  const headings = ["Introduction", "Installation", "Usage", "API Reference", "Examples"];
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContentsTitle>On this page</TableOfContentsTitle>
    <TableOfContentsList>
      {#each headings as heading}
        <TableOfContentsItem class="cursor-pointer">{heading}</TableOfContentsItem>
      {/each}
    </TableOfContentsList>
  </TableOfContents>
</div>
