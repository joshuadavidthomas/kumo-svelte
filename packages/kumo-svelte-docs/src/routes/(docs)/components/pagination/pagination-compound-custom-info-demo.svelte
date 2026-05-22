<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(1);
</script>

{#snippet info(props: { page: number; totalCount?: number })}
  Page {props.page} of {Math.ceil((props.totalCount ?? 1) / 25)}
{/snippet}

<Pagination.Root bind:page perPage={25} totalCount={100}>
  <Pagination.Info text={info} />
  <Pagination.Controls />
</Pagination.Root>
