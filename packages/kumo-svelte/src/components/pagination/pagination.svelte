<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import {
    DEFAULT_PAGINATION_LABELS,
    setPaginationContext,
    type PaginationLabels,
  } from "./context";
  import PaginationControls from "./pagination-controls.svelte";
  import PaginationInfo from "./pagination-info.svelte";
  import {
    KUMO_PAGINATION_DEFAULT_VARIANTS,
    type KumoPaginationControls,
  } from "./variants";

  export interface PaginationInfoSnippetProps {
    page: number;
    pageShowingRange: string;
    perPage?: number;
    totalCount?: number;
  }

  export interface PaginationProps {
    children?: Snippet;
    class?: string;
    controls?: KumoPaginationControls;
    labels?: PaginationLabels;
    page?: number;
    perPage?: number;
    setPage?: (page: number) => void;
    text?: Snippet<[props: PaginationInfoSnippetProps]>;
    totalCount?: number;
  }

  let {
    children,
    class: className,
    controls = KUMO_PAGINATION_DEFAULT_VARIANTS.controls,
    labels: labelsProp,
    page = $bindable(1),
    perPage,
    setPage: setPageProp,
    text,
    totalCount,
  }: PaginationProps = $props();

  let editingPage = $derived(page);
  let labels = $derived({ ...DEFAULT_PAGINATION_LABELS, ...labelsProp });
  let pageShowingRange = $derived(getPageShowingRange(page, perPage, totalCount));
  let maxPage = $derived(Math.max(1, Math.ceil((totalCount ?? 1) / (perPage ?? 1))));

  function getPageShowingRange(page: number, perPage: number | undefined, totalCount: number | undefined) {
    let lower = page * (perPage ?? 1) - (perPage ?? 0) + 1;
    let upper = Math.min(page * (perPage ?? 0), totalCount ?? 0);

    if (Number.isNaN(lower)) lower = 0;
    if (Number.isNaN(upper)) upper = 0;

    return `${lower}-${upper}`;
  }

  function updatePage(nextPage: number) {
    page = nextPage;
    setPageProp?.(nextPage);
  }

  function updateEditingPage(nextPage: number) {
    editingPage = nextPage;
  }

  setPaginationContext({
    get editingPage() {
      return editingPage;
    },
    get labels() {
      return labels;
    },
    get maxPage() {
      return maxPage;
    },
    get page() {
      return page;
    },
    get pageShowingRange() {
      return pageShowingRange;
    },
    get perPage() {
      return perPage;
    },
    get totalCount() {
      return totalCount;
    },
    setEditingPage: updateEditingPage,
    setPage: updatePage,
  });
</script>

<div data-slot="pagination" class={cn("flex w-full items-center gap-2", className)}>
  {#if children}
    {@render children()}
  {:else}
    <PaginationInfo class="grow" {text} />
    <PaginationControls {controls} />
  {/if}
</div>
