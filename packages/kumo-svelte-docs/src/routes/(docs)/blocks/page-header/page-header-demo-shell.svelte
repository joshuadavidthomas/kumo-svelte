<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    actions?: Snippet;
    breadcrumbs?: Snippet;
    class?: string;
    description?: string;
    tabs?: Snippet;
    title?: string;
  }

  let {
    actions,
    breadcrumbs,
    class: className = "",
    description,
    tabs,
    title,
  }: Props = $props();
</script>

<div class={`w-full rounded-lg border border-kumo-hairline bg-kumo-base ${className}`}>
  <div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
    <div class="min-w-0 space-y-3">
      {#if breadcrumbs}
        <div class="min-w-0">{@render breadcrumbs()}</div>
      {/if}
      {#if title || description}
        <div class="space-y-1">
          {#if title}<h2 class="m-0 text-2xl font-semibold tracking-tight text-kumo-default">{title}</h2>{/if}
          {#if description}<p class="m-0 max-w-2xl text-sm text-kumo-subtle">{description}</p>{/if}
        </div>
      {/if}
    </div>
    {#if actions}
      <div class="flex shrink-0 gap-2">{@render actions()}</div>
    {/if}
  </div>
  {#if tabs}
    <div class="border-t border-kumo-hairline px-4 py-3">
      {@render tabs()}
    </div>
  {/if}
</div>
