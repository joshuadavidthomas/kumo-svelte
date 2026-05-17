<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteFooterProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: CommandPaletteFooterProps = $props();
</script>

<div class={cn("flex items-center justify-between rounded-b-lg bg-kumo-elevated px-4 py-3 text-xs text-kumo-subtle", className)}>
  {@render children?.()}
</div>
