<script lang="ts">
  import { TableOfContents, TableOfContentsGroup, TableOfContentsItem, TableOfContentsList, TableOfContentsTitle } from "kumo-svelte";
</script>

<div class="min-w-48">
  <span id="examples-demo" class="sr-only">Examples</span>
  <span id="api-demo" class="sr-only">API</span>
  <TableOfContents>
    <TableOfContentsTitle>On this page</TableOfContentsTitle>
    <TableOfContentsList>
      <TableOfContentsItem active class="cursor-pointer">Overview</TableOfContentsItem>
      <TableOfContentsGroup label="Examples" href="#examples-demo">
        <TableOfContentsItem class="cursor-pointer">Basic example</TableOfContentsItem>
        <TableOfContentsItem class="cursor-pointer">Advanced example</TableOfContentsItem>
      </TableOfContentsGroup>
      <TableOfContentsGroup label="Getting Started">
        <TableOfContentsItem class="cursor-pointer">Installation</TableOfContentsItem>
        <TableOfContentsItem class="cursor-pointer">Configuration</TableOfContentsItem>
      </TableOfContentsGroup>
      <TableOfContentsGroup label="API" href="#api-demo">
        <TableOfContentsItem class="cursor-pointer">Props</TableOfContentsItem>
        <TableOfContentsItem class="cursor-pointer">Events</TableOfContentsItem>
      </TableOfContentsGroup>
    </TableOfContentsList>
  </TableOfContents>
</div>
