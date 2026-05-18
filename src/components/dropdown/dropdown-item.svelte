<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    dropdownVariants,
    KUMO_DROPDOWN_DEFAULT_VARIANTS,
    KUMO_DROPDOWN_ITEM_CLASS,
    type KumoDropdownVariant,
  } from "./variants";

  export type DropdownMenuItemProps = Omit<DropdownMenuPrimitive.ItemProps, "children"> & {
    children?: Snippet;
    icon?: Snippet;
    inset?: boolean;
    selected?: boolean;
    variant?: KumoDropdownVariant;
  };

  let {
    children,
    class: className,
    icon,
    inset = false,
    selected = false,
    variant = KUMO_DROPDOWN_DEFAULT_VARIANTS.variant,
    ...restProps
  }: DropdownMenuItemProps = $props();
</script>

<DropdownMenuPrimitive.Item
  data-slot="dropdown-menu-item"
  class={cn(KUMO_DROPDOWN_ITEM_CLASS, inset && "pl-8", dropdownVariants({ variant }), className)}
  {...restProps}
>
  {#if icon}
    <span class="mr-2 inline-flex h-4 w-4 items-center justify-center">
      {@render icon()}
    </span>
  {/if}
  {@render children?.()}
  {#if selected}
    <span class="ml-auto inline-flex">
      <CheckIcon aria-hidden="true" size={16} weight="bold" />
    </span>
  {/if}
</DropdownMenuPrimitive.Item>
