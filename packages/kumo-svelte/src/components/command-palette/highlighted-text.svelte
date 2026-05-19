<script lang="ts">
  import type { HighlightRange } from "./variants";

  export interface HighlightedTextProps {
    class?: string;
    highlights?: HighlightRange[];
    text: string;
  }

  let {
    class: className,
    highlights = [],
    text,
  }: HighlightedTextProps = $props();

  let parts = $derived(
    getHighlightedParts(text, highlights).map((part, index) => ({ ...part, index })),
  );

  function getHighlightedParts(text: string, highlights: HighlightRange[]) {
    if (highlights.length === 0) return [{ highlighted: false, text }];

    const merged: HighlightRange[] = [];
    for (const range of [...highlights].sort((a, b) => a[0] - b[0])) {
      const last = merged[merged.length - 1];
      if (last && range[0] <= last[1] + 1) {
        last[1] = Math.max(last[1], range[1]);
      } else {
        merged.push([...range]);
      }
    }

    const parts: Array<{ highlighted: boolean; text: string }> = [];
    let lastIndex = 0;

    for (const [start, end] of merged) {
      if (start > lastIndex) {
        parts.push({ highlighted: false, text: text.slice(lastIndex, start) });
      }
      parts.push({ highlighted: true, text: text.slice(start, end + 1) });
      lastIndex = end + 1;
    }

    if (lastIndex < text.length) {
      parts.push({ highlighted: false, text: text.slice(lastIndex) });
    }

    return parts;
  }
</script>

<span class={className}>
  {#each parts as part (part.index)}
    {#if part.highlighted}
      <mark class="rounded-sm bg-kumo-warning/50 text-kumo-default">{part.text}</mark>
    {:else}
      <span>{part.text}</span>
    {/if}
  {/each}
</span>
