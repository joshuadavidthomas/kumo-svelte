<script lang="ts">
  import type { Snippet } from "svelte";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon.svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CollapsibleDefaultTriggerProps {
    children: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
  }: CollapsibleDefaultTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-slot="collapsible-trigger"
  {id}
  {disabled}
  class={cn(
    "bg-transparent border-none shadow-none p-0 m-0",
    "group flex cursor-pointer items-center gap-1 text-sm text-kumo-link select-none",
    className,
  )}
>
  {@render children()}
  <CaretDownIcon
    aria-hidden="true"
    size={16}
    weight="bold"
    class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
  />
</CollapsiblePrimitive.Trigger>
