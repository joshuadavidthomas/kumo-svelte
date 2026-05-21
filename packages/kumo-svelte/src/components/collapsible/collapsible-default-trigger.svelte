<script lang="ts">
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type CollapsibleDefaultTriggerProps = CollapsiblePrimitive.TriggerProps;

  let { children, class: className, ...restProps }: CollapsibleDefaultTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-slot="collapsible-trigger"
  {...restProps}
  class={cn(
    "bg-transparent border-none shadow-none p-0 m-0",
    "group flex cursor-pointer items-center gap-1 text-sm text-kumo-link select-none",
    className,
  )}
>
  {@render children?.()}
  <CaretDownIcon
    aria-hidden="true"
    size={16}
    weight="bold"
    class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
  />
</CollapsiblePrimitive.Trigger>
