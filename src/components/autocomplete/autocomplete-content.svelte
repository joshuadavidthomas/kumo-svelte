<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface AutocompleteContentProps {
    children?: Snippet;
    class?: string;
    container?: PortalProps["to"];
    sideOffset?: number;
  }

  let {
    children,
    class: className,
    container,
    sideOffset = 4,
  }: AutocompleteContentProps = $props();
</script>

<ComboboxPrimitive.Portal to={container}>
  <ComboboxPrimitive.Content
    {sideOffset}
    class={cn(
      "flex flex-col",
      "max-h-[min(var(--bits-combobox-content-available-height),24rem)] max-w-[var(--bits-combobox-content-available-width)] min-w-[var(--bits-combobox-anchor-width)] py-1.5",
      "rounded-lg bg-kumo-control text-kumo-default shadow-lg ring ring-kumo-line",
      "data-[state=closed]:hidden",
      className,
    )}
  >
    {@render children?.()}
  </ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
