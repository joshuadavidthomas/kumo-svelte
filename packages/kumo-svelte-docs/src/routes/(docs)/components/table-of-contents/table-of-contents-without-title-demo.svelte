<script lang="ts">
  import { TableOfContents } from "kumo-svelte";

  const headings = ["Introduction", "Installation", "Usage"];
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.List>
      {#each headings as heading}
        <TableOfContents.Item active={heading === "Introduction"} class="cursor-pointer">{heading}</TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>
