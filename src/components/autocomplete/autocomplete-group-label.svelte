<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface AutocompleteGroupLabelProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: AutocompleteGroupLabelProps = $props();
</script>

<ComboboxPrimitive.GroupHeading
  class={cn("mx-1.5 px-2 py-1.5 text-sm text-kumo-strong", className)}
>
  {@render children?.()}
</ComboboxPrimitive.GroupHeading>
