<script lang="ts">
  import * as TableOfContents from "kumo-svelte/components/table-of-contents";
  const headings = ["Introduction", "Installation", "Usage", "API Reference", "Examples"];
</script>

<div class="min-w-48">
  <TableOfContents.Root>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      {#each headings as heading}
        <TableOfContents.Item active={heading === "Usage"} class="cursor-pointer">{heading}</TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents.Root>
</div>
