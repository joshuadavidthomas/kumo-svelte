<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon.svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface CommandPaletteInputProps {
    "aria-label"?: string;
    autocomplete?: HTMLInputAttributes["autocomplete"];
    autofocus?: boolean;
    class?: string;
    leading?: Snippet;
    onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
    placeholder?: string;
    trailing?: Snippet;
    value?: string;
  }

  import type { Snippet } from "svelte";

  let {
    "aria-label": ariaLabel,
    autocomplete,
    autofocus = true,
    class: className,
    leading,
    onkeydown,
    placeholder,
    trailing,
    value = $bindable(""),
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
    aria-label={ariaLabel}
    {autocomplete}
    {autofocus}
    {onkeydown}
    {placeholder}
    class={cn(
      "flex-1 border-none bg-transparent text-base outline-none kumo-input-placeholder disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
  />
  {#if trailing}
    {@render trailing()}
  {/if}
</div>
