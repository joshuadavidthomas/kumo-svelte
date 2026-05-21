<script lang="ts">
  import { cn } from "../../utils/cn";

  export interface SkeletonLineProps {
    blockHeight?: string | number;
    class?: string;
    maxDelay?: number;
    maxDuration?: number;
    maxWidth?: number;
    minDelay?: number;
    minDuration?: number;
    minWidth?: number;
  }

  let {
    blockHeight,
    class: className,
    maxDelay = 0.5,
    maxDuration = 1.7,
    maxWidth = 100,
    minDelay = 0,
    minDuration = 1.3,
    minWidth = 30,
  }: SkeletonLineProps = $props();

  let randomStyle = $derived.by(() => {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    const duration = (Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2);
    const delay = (Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2);

    return `--skeleton-width: ${width}%; --shimmer-duration: ${duration}s; --shimmer-delay: ${delay}s;`;
  });
  let blockHeightStyle = $derived(
    typeof blockHeight === "number" ? `${blockHeight}px` : blockHeight,
  );
</script>

{#snippet line()}
  <div class={cn("skeleton-line", className)} style={randomStyle}></div>
{/snippet}

{#if blockHeight !== undefined}
  <div class="flex items-center" style={`height: ${blockHeightStyle};`}>
    {@render line()}
  </div>
{:else}
  {@render line()}
{/if}
