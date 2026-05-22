<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(1);
  let perPage = $state(10);
</script>

<Pagination bind:page {perPage} totalCount={200}>
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
</Pagination>
