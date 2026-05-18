<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type SelectContentProps = SelectPrimitive.ContentProps;

  let { children, class: className, sideOffset = 8, preventScroll = true, ...restProps }: SelectContentProps =
    $props();
</script>

<SelectPrimitive.Content
  data-slot="select-content"
  {sideOffset}
  {preventScroll}
  class={cn(
    "flex flex-col",
    "max-h-[var(--bits-select-content-available-height)] bg-kumo-base text-kumo-default",
    "rounded-lg shadow-lg ring ring-kumo-line",
    "min-w-[calc(var(--bits-select-anchor-width)+3px)] py-1.5",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</SelectPrimitive.Content>
