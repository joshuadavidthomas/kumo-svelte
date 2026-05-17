<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface ComboboxGroupLabelProps {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
  }: ComboboxGroupLabelProps = $props();
</script>

<ComboboxPrimitive.GroupHeading
  class={cn("mx-1.5 px-2 py-1.5 text-sm text-kumo-subtle", className)}
>
  {@render children?.()}
</ComboboxPrimitive.GroupHeading>
