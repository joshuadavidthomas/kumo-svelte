<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteProps {
    children?: Snippet;
    class?: string;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    label?: string;
    loop?: boolean;
    onValueChange?: (value: string) => void;
    shouldFilter?: boolean;
    value?: string;
  }

  let {
    children,
    class: className,
    filter,
    label = "Command palette",
    loop,
    onValueChange,
    shouldFilter,
    value = $bindable(""),
  }: CommandPaletteProps = $props();
</script>

<CommandPrimitive.Root
  bind:value
  {filter}
  {label}
  {loop}
  {onValueChange}
  {shouldFilter}
  class={cn("flex size-full flex-col overflow-hidden", className)}
>
  {@render children?.()}
</CommandPrimitive.Root>
