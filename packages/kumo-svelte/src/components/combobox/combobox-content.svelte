<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { getComboboxContext } from "./context";

  export interface ComboboxContentProps {
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
  }: ComboboxContentProps = $props();

  const portalContext = getKumoPortalContext();
  const comboboxContext = getComboboxContext("Content");
  let portalContainer = $derived(container ?? portalContext.container);
  let customAnchor = $derived(comboboxContext.triggerNode);
</script>

<ComboboxPrimitive.Portal to={portalContainer}>
  <ComboboxPrimitive.Content
    data-slot="combobox-content"
    {customAnchor}
    {sideOffset}
    class={cn(
      "flex flex-col",
      "max-h-[min(var(--bits-combobox-content-available-height),24rem)] max-w-[var(--bits-combobox-content-available-width)] min-w-[var(--bits-combobox-anchor-width)] py-1.5",
      "rounded-lg bg-kumo-base text-kumo-default shadow-lg ring ring-kumo-line",
      className,
    )}
  >
    {@render children?.()}
  </ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
