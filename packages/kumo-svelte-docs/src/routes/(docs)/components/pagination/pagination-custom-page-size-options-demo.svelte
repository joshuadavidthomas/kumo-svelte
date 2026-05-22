<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(1);
  let perPage = $state(10);
</script>

<Pagination.Root bind:page {perPage} totalCount={200}>
  <Pagination.Info />
  <Pagination.Separator />
  <Pagination.PageSize
    value={perPage}
    options={[10, 20, 50]}
    onValueChange={(size) => {
      perPage = size;
      page = 1;
    }}
  />
  <Pagination.Controls />
</Pagination.Root>
