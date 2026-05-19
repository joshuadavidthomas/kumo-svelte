<script lang="ts">
  import { Pagination, PaginationControls, PaginationInfo } from "kumo-svelte";

  let page = $state(1);
</script>

{#snippet frenchInfo(props: { pageShowingRange: string; totalCount?: number })}
  Affichage de <span class="tabular-nums">{props.pageShowingRange}</span> sur
  <span class="tabular-nums">{props.totalCount}</span>
{/snippet}

<Pagination
  bind:page
  perPage={10}
  totalCount={100}
  labels={{
    firstPage: "Première page",
    previousPage: "Page précédente",
    nextPage: "Page suivante",
    lastPage: "Dernière page",
    pageNumber: "Numéro de page",
    pageSize: "Taille de page",
  }}
>
  <PaginationInfo text={frenchInfo} />
  <PaginationControls />
</Pagination>
