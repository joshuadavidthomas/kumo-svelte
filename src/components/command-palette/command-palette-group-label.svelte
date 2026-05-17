<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteGroupLabelProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: CommandPaletteGroupLabelProps = $props();
</script>

<CommandPrimitive.GroupHeading
  class={cn("mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle", className)}
>
  {@render children?.()}
</CommandPrimitive.GroupHeading>
