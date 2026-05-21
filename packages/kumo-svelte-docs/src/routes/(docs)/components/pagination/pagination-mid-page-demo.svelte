<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(5);
</script>

<Pagination bind:page perPage={10} totalCount={100} />
