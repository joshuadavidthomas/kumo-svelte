<script lang="ts">
  import { Pagination } from "kumo-svelte";

  let page = $state(1);
</script>

{#snippet customText(props: { perPage?: number })}
  Page {page} - showing {props.perPage} per page
{/snippet}

<Pagination bind:page perPage={25} totalCount={100} text={customText} />
