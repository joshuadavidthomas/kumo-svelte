<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface AutocompleteListProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: AutocompleteListProps = $props();
</script>

<ComboboxPrimitive.Viewport
  data-slot="autocomplete-list"
  class={cn(
    "min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-pt-2 scroll-pb-2",
    className,
  )}
>
  {@render children?.()}
</ComboboxPrimitive.Viewport>
