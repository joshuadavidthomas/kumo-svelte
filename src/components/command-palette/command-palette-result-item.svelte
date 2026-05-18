<script lang="ts">
  import type { Snippet } from "svelte";
  import ArrowRightIcon from "phosphor-svelte/lib/ArrowRightIcon";
  import ArrowSquareOutIcon from "phosphor-svelte/lib/ArrowSquareOutIcon";
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import { cn } from "../../utils/cn";
  import CommandPaletteItem from "./command-palette-item.svelte";
  import HighlightedText from "./highlighted-text.svelte";
  import type { HighlightRange } from "./variants";

  export interface CommandPaletteResultItemProps {
    breadcrumbHighlights?: HighlightRange[][];
    breadcrumbs?: string[];
    description?: string;
    external?: boolean;
    icon?: Snippet;
    nonInteractive?: boolean;
    onSelect?: () => void;
    showArrow?: boolean;
    title: string;
    titleHighlights?: HighlightRange[];
    value?: string;
  }

  let {
    breadcrumbHighlights,
    breadcrumbs = [],
    description,
    external = false,
    icon,
    nonInteractive = false,
    onSelect,
    showArrow = true,
    title,
    titleHighlights,
    value,
  }: CommandPaletteResultItemProps = $props();
</script>

<CommandPaletteItem
  {value}
  onSelect={nonInteractive ? undefined : onSelect}
  class={cn(
    "group flex w-full items-center gap-3",
    nonInteractive ? "cursor-default" : "cursor-pointer",
  )}
  disabled={nonInteractive}
>
  {#if icon}
    <div class="flex shrink-0 items-center text-kumo-subtle">
      {@render icon()}
    </div>
  {/if}
  <div class="min-w-0 flex-1">
    <div class="flex items-center gap-2 truncate">
      {#each breadcrumbs as crumb, index (`${index}-${crumb}`)}
        <span class="flex items-center gap-2">
          <HighlightedText
            text={crumb}
            highlights={breadcrumbHighlights?.[index]}
            class="text-base text-kumo-default"
          />
          <CaretRightIcon aria-hidden="true" class="h-3 w-3 shrink-0 text-kumo-subtle" weight="bold" />
        </span>
      {/each}
      <HighlightedText text={title} highlights={titleHighlights} class="text-base text-kumo-default" />
      {#if external}
        <ArrowSquareOutIcon aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-kumo-subtle" />
      {/if}
      {#if description}
        <span class="text-kumo-subtle">-</span>
        <span class="truncate text-sm text-kumo-subtle">{description}</span>
      {/if}
    </div>
  </div>
  {#if showArrow && !external && !nonInteractive}
    <ArrowRightIcon
      aria-hidden="true"
      class="h-4 w-4 shrink-0 text-kumo-subtle opacity-0 transition-opacity group-data-[selected]:opacity-100"
    />
  {/if}
</CommandPaletteItem>
