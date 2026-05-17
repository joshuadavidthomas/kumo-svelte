<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";

  export interface AutocompleteGroupProps {
    children?: Snippet;
  }

  let { children }: AutocompleteGroupProps = $props();
</script>

<ComboboxPrimitive.Group class="mt-2 border-t border-kumo-line pt-2 first:mt-0 first:border-t-0 first:pt-0">
  {@render children?.()}
</ComboboxPrimitive.Group>
