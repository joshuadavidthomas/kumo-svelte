<script lang="ts">
  import { TableOfContents, TableOfContentsGroup, TableOfContentsItem, TableOfContentsList, TableOfContentsTitle } from "kumo-svelte";
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContentsTitle>On this page</TableOfContentsTitle>
    <TableOfContentsList>
      <TableOfContentsItem href="#" active class="cursor-pointer">Overview</TableOfContentsItem>
      <TableOfContentsGroup label="Examples" href="#examples-demo">
        <TableOfContentsItem href="#" class="cursor-pointer">Basic example</TableOfContentsItem>
        <TableOfContentsItem href="#" class="cursor-pointer">Advanced example</TableOfContentsItem>
      </TableOfContentsGroup>
      <TableOfContentsGroup label="Getting Started">
        <TableOfContentsItem href="#" class="cursor-pointer">Installation</TableOfContentsItem>
        <TableOfContentsItem href="#" class="cursor-pointer">Configuration</TableOfContentsItem>
      </TableOfContentsGroup>
      <TableOfContentsGroup label="API" href="#api-demo">
        <TableOfContentsItem href="#" class="cursor-pointer">Props</TableOfContentsItem>
        <TableOfContentsItem href="#" class="cursor-pointer">Events</TableOfContentsItem>
      </TableOfContentsGroup>
    </TableOfContentsList>
  </TableOfContents>
</div>
