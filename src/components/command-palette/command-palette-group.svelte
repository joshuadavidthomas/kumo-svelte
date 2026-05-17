<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteGroupProps {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    value?: string;
  }

  let {
    children,
    class: className,
    forceMount,
    value,
  }: CommandPaletteGroupProps = $props();
</script>

<CommandPrimitive.Group {forceMount} {value} class={cn("space-y-0.5", className)}>
  {@render children?.()}
</CommandPrimitive.Group>
