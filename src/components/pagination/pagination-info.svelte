<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import { getPaginationContext } from "./context";
  import type { PaginationInfoSnippetProps } from "./pagination.svelte";

  export interface PaginationInfoProps {
    class?: string;
    text?: Snippet<[props: PaginationInfoSnippetProps]>;
  }

  let {
    class: className,
    text,
  }: PaginationInfoProps = $props();

  const context = getPaginationContext("Info");
</script>

<div data-slot="pagination-info" class={cn("text-sm text-kumo-subtle", className)}>
  {#if text}
    {@render text({
      page: context.page,
      perPage: context.perPage,
      totalCount: context.totalCount,
      pageShowingRange: context.pageShowingRange,
    })}
  {:else if context.totalCount && context.totalCount > 0}
    Showing <span class="tabular-nums">{context.pageShowingRange}</span> of
    <span class="tabular-nums">{context.totalCount}</span>
  {/if}
</div>

