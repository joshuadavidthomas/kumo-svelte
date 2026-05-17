<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";

  export interface SwitchLegendProps {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: SwitchLegendProps = $props();
</script>

<legend class={cn("text-base font-medium text-kumo-default", className)}>
  {@render children()}
</legend>
