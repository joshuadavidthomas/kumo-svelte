<script lang="ts">
  import { Pagination, PaginationControls, PaginationInfo } from "kumo-svelte";

  let page = $state(1);
</script>

{#snippet info(props: { page: number; totalCount?: number })}
  Page {props.page} of {Math.ceil((props.totalCount ?? 1) / 25)}
{/snippet}

<Pagination bind:page perPage={25} totalCount={100}>
  <PaginationInfo text={info} />
  <PaginationControls />
</Pagination>
