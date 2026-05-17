<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteListProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: CommandPaletteListProps = $props();
</script>

<CommandPrimitive.List
  class={cn(
    "relative min-h-0 flex-1 overflow-y-auto rounded-b-lg bg-kumo-base px-2 py-2 scroll-py-2 ring-1 ring-kumo-hairline",
    className,
  )}
>
  {@render children?.()}
</CommandPrimitive.List>
