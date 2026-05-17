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

  let width = $derived(Math.floor((minWidth + maxWidth) / 2));
  let duration = $derived(((minDuration + maxDuration) / 2).toFixed(2));
  let delay = $derived(((minDelay + maxDelay) / 2).toFixed(2));
  let lineStyle = $derived(
    `--skeleton-width: ${width}%; --shimmer-duration: ${duration}s; --shimmer-delay: ${delay}s;`,
  );
  let blockHeightStyle = $derived(
    typeof blockHeight === "number" ? `${blockHeight}px` : blockHeight,
  );
</script>

{#snippet line()}
  <div class={cn("skeleton-line", className)} style={lineStyle}></div>
{/snippet}

{#if blockHeight !== undefined}
  <div class="flex items-center" style={`height: ${blockHeightStyle};`}>
    {@render line()}
  </div>
{:else}
  {@render line()}
{/if}
