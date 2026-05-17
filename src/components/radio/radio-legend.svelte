<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";

  export interface RadioLegendProps {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: RadioLegendProps = $props();
</script>

<legend class={cn("text-base font-medium text-kumo-default", className)}>
  {@render children()}
</legend>
