<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(1);
  let perPage = $state(25);
</script>

<Pagination bind:page {perPage} totalCount={500}>
  <Pagination.Info />
  <div class="flex items-center gap-2">
    <Pagination.Controls />
    <Pagination.Separator />
    <Pagination.PageSize
      value={perPage}
      onValueChange={(size) => {
        perPage = size;
        page = 1;
      }}
    />
  </div>
</Pagination>
