<script lang="ts">
  import {
    Pagination,
    PaginationControls,
    PaginationInfo,
    PaginationPageSize,
    PaginationSeparator,
  } from "kumo-svelte";

  let page = $state(1);
  let perPage = $state(10);
</script>

<Pagination bind:page {perPage} totalCount={200}>
  <PaginationInfo />
  <PaginationSeparator />
  <PaginationPageSize
    value={perPage}
    options={[10, 20, 50]}
    onChange={(size) => {
      perPage = size;
      page = 1;
    }}
  />
  <PaginationControls />
</Pagination>
