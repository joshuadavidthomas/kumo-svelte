<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(1);
  let perPage = $state(25);
</script>

<Pagination.Root bind:page {perPage} totalCount={500}>
  <Pagination.Info />
  <Pagination.Separator />
  <Pagination.PageSize
    value={perPage}
    onValueChange={(size) => {
      perPage = size;
      page = 1;
    }}
  />
  <Pagination.Controls pageSelector="dropdown" />
</Pagination.Root>
