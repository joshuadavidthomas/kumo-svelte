<script lang="ts">
  import type { Snippet } from "svelte";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import { Command as CommandPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type CommandPaletteInputProps = Omit<
    CommandPrimitive.InputProps,
    "class" | "children"
  > & {
    class?: string;
    leading?: Snippet;
    trailing?: Snippet;
  };

  let {
    autofocus = true,
    class: className,
    leading,
    trailing,
    value = $bindable(""),
    ...restProps
  }: CommandPaletteInputProps = $props();
</script>

<div
  data-slot="command-palette-input-wrapper"
  class="flex items-center gap-3 bg-kumo-base px-4 py-3 focus-within:ring-2 focus-within:ring-kumo-brand"
>
  {#if leading}
    {@render leading()}
  {:else}
    <MagnifyingGlassIcon aria-hidden="true" class="h-4 w-4 text-kumo-subtle" weight="bold" />
  {/if}
  <CommandPrimitive.Input
    data-slot="command-palette-input"
    bind:value
    {autofocus}
    {...restProps}
    class={cn(
      "flex-1 border-none bg-transparent text-base outline-none kumo-input-placeholder disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
  />
  {#if trailing}
    {@render trailing()}
  {/if}
</div>
