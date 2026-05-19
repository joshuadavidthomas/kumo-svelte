<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";

  export interface ComboboxGroupProps {
    children?: Snippet;
  }

  let { children }: ComboboxGroupProps = $props();
</script>

<ComboboxPrimitive.Group
  data-slot="combobox-group"
  class="mt-2 border-t border-kumo-hairline pt-2 first:mt-0 first:border-t-0 first:pt-0"
>
  {@render children?.()}
</ComboboxPrimitive.Group>
