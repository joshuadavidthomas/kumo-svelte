<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import { Combobox as ComboboxPrimitive } from "bits-ui";
  import type { PortalProps } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
  import { getAutocompleteContext } from "./context";

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

  const portalContext = getKumoPortalContext();
  const autocompleteContext = getAutocompleteContext("Content");

  let contentRef: HTMLElement | null = $state(null);
  let portalContainer = $derived(container ?? portalContext.container);

  $effect(() => {
    let inputValue = autocompleteContext.inputValue;
    if (!contentRef) return;

    clearHighlightedItem(inputValue);
  });

  async function clearHighlightedItem(_inputValue?: string) {
    await tick();

    contentRef
      ?.querySelectorAll<HTMLElement>("[data-slot='autocomplete-item'][data-highlighted]")
      .forEach((item) => item.removeAttribute("data-highlighted"));
  }
</script>

<ComboboxPrimitive.Portal to={portalContainer}>
  <ComboboxPrimitive.Content
    bind:ref={contentRef}
    data-slot="autocomplete-content"
    {sideOffset}
    class={cn(
      "flex flex-col",
      "max-h-[min(var(--bits-combobox-content-available-height),24rem)] max-w-[var(--bits-combobox-content-available-width)] min-w-[var(--bits-combobox-anchor-width)] py-1.5",
      "rounded-lg bg-kumo-control text-kumo-default shadow-lg ring ring-kumo-line",
      "data-[state=closed]:hidden",
      className,
    )}
    onpointerleave={() => clearHighlightedItem()}
  >
    {@render children?.()}
  </ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
