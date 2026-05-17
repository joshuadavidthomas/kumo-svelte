<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import Select from "../select/select.svelte";
  import { getPaginationContext } from "./context";

  const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100, 250] as const;

  export interface PaginationPageSizeProps {
    class?: string;
    label?: Snippet | string;
    onChange: (size: number) => void;
    options?: number[];
    value: number;
  }

  let {
    class: className,
    label = "Per page:",
    onChange,
    options = [...DEFAULT_PAGE_SIZE_OPTIONS],
    value,
  }: PaginationPageSizeProps = $props();

  const context = getPaginationContext("PageSize");
  let items = $derived(options.map((size) => ({ label: String(size), value: String(size) })));
</script>

<div data-slot="pagination-page-size" class={cn("flex items-center gap-2", className)}>
  {#if label}
    <span class="text-sm text-kumo-subtle">
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </span>
  {/if}
  <Select
    aria-label={context.labels.pageSize}
    value={String(value)}
    {items}
    onValueChange={(nextValue) => onChange(Number(nextValue))}
  />
</div>

