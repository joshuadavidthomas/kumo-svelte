<script lang="ts">
  import {
    Pagination,
    PaginationControls,
    PaginationInfo,
    PaginationPageSize,
    PaginationSeparator,
  } from "kumo-svelte";

  let page = $state(1);
  let perPage = $state(25);
</script>

<Pagination bind:page {perPage} totalCount={500}>
  <PaginationInfo />
  <PaginationSeparator />
  <PaginationPageSize
    value={perPage}
    onChange={(size) => {
      perPage = size;
      page = 1;
    }}
  />
  <PaginationControls pageSelector="dropdown" />
</Pagination>
