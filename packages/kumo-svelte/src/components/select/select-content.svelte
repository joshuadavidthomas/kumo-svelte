<script lang="ts">
  import { tick } from "svelte";
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type SelectContentProps = SelectPrimitive.ContentProps;

  let { children, class: className, sideOffset = 0, preventScroll = true, ...restProps }: SelectContentProps =
    $props();

  let contentRef: HTMLElement | null = $state(null);
  let pointerStartedInside = false;

  $effect(() => {
    if (!contentRef) return;

    updateSelectedOffset();
  });

  async function updateSelectedOffset() {
    await tick();

    if (!contentRef) return;

    const firstItem = contentRef.querySelector<HTMLElement>("[data-slot='select-item']");
    const selectedItem = contentRef.querySelector<HTMLElement>("[data-slot='select-item'][data-selected]");
    const selectedOffset = firstItem && selectedItem ? selectedItem.offsetTop - firstItem.offsetTop : 0;

    contentRef.style.setProperty("--kumo-select-selected-offset", `${selectedOffset}px`);
  }

  function handlePointerDownCapture() {
    pointerStartedInside = true;
  }

  function handlePointerUpCapture(event: PointerEvent) {
    if (!pointerStartedInside) {
      event.preventDefault();
      event.stopPropagation();
    }

    pointerStartedInside = false;
  }

  function handlePointerLeave() {
    document
      .querySelectorAll<HTMLElement>("[data-slot='select-item'][data-highlighted]")
      .forEach((item) => item.removeAttribute("data-highlighted"));
  }
</script>

<SelectPrimitive.Content
  bind:ref={contentRef}
  data-slot="select-content"
  {sideOffset}
  {preventScroll}
  class={cn(
    "relative z-50 flex flex-col",
    "max-h-[var(--bits-select-content-available-height)] bg-kumo-base text-kumo-default",
    "rounded-lg shadow-lg ring ring-kumo-line",
    "min-w-[calc(var(--bits-select-anchor-width)+3px)] py-1.5",
    "data-[side=bottom]:-translate-y-[calc(var(--bits-select-anchor-height)+4px+var(--kumo-select-selected-offset,0px))]",
    "data-[side=top]:translate-y-[calc(var(--bits-select-anchor-height)+4px+var(--kumo-select-selected-offset,0px))]",
    className,
  )}
  onpointerdowncapture={handlePointerDownCapture}
  onpointerupcapture={handlePointerUpCapture}
  onpointerleave={handlePointerLeave}
  {...restProps}
>
  {@render children?.()}
</SelectPrimitive.Content>
