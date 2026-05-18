<script lang="ts">
  import type { Snippet } from "svelte";
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon.svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type DropdownMenuSubTriggerProps = Omit<
    DropdownMenuPrimitive.SubTriggerProps,
    "children"
  > & {
    children?: Snippet;
    icon?: Snippet;
    inset?: boolean;
  };

  let {
    children,
    class: className,
    icon,
    inset = false,
    ...restProps
  }: DropdownMenuSubTriggerProps = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  data-slot="dropdown-menu-sub-trigger"
  class={cn(
    "flex cursor-default items-center rounded-sm px-2 py-1.5 text-base outline-none select-none",
    "focus:bg-kumo-tint focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "data-[state=open]:bg-kumo-tint",
    inset && "pl-8",
    className,
  )}
  {...restProps}
>
  {#if icon}
    <span class="mr-2 inline-flex h-4 w-4 items-center justify-center">
      {@render icon()}
    </span>
  {/if}
  {@render children?.()}
  <span class="ml-auto inline-flex">
    <CaretRightIcon aria-hidden="true" size={16} weight="bold" />
  </span>
</DropdownMenuPrimitive.SubTrigger>
