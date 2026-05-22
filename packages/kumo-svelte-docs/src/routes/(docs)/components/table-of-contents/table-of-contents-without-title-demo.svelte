<script lang="ts">
  import * as TableOfContents from "kumo-svelte/components/table-of-contents";
  const headings = ["Introduction", "Installation", "Usage"];
</script>

<div class="min-w-48">
  <TableOfContents.Root>
    <TableOfContents.List>
      {#each headings as heading}
        <TableOfContents.Item active={heading === "Introduction"} class="cursor-pointer">{heading}</TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents.Root>
</div>
