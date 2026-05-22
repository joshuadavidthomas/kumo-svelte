<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(1);
</script>

<Pagination.Root bind:page perPage={10} totalCount={100} controls="simple" />
