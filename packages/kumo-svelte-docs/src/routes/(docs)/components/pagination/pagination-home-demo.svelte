<script lang="ts">
  import { Pagination, PaginationControls } from "kumo-svelte";

  let page = $state(1);
</script>

<Pagination bind:page perPage={10} totalCount={100} class="w-auto">
  {#snippet children()}
    <PaginationControls />
  {/snippet}
</Pagination>
