<script lang="ts">
  import { TableOfContents, TableOfContentsItem, TableOfContentsList } from "kumo-svelte";

  const headings = ["Introduction", "Installation", "Usage"];
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContentsList>
      {#each headings as heading}
        <TableOfContentsItem href="#" active={heading === "Introduction"} class="cursor-pointer">{heading}</TableOfContentsItem>
      {/each}
    </TableOfContentsList>
  </TableOfContents>
</div>
