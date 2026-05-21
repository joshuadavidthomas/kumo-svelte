<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(1);
</script>

<Pagination bind:page perPage={10} totalCount={100} controls="full" />
