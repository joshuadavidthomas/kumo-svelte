<script lang="ts">
  import * as Pagination from "kumo-svelte/components/pagination";
  let page = $state(1);
</script>

{#snippet customText(props: { perPage?: number })}
  Page {page} - showing {props.perPage} per page
{/snippet}

<Pagination.Root bind:page perPage={25} totalCount={100} text={customText} />
