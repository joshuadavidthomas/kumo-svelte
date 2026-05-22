<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(5);
</script>

<Pagination.Root bind:page perPage={10} totalCount={100} />
