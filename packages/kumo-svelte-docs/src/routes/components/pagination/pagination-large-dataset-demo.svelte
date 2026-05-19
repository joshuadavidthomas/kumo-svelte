<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(1);
</script>

<Pagination bind:page perPage={25} totalCount={1250} />
