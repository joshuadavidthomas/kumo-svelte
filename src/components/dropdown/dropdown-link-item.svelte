<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    dropdownVariants,
    KUMO_DROPDOWN_DEFAULT_VARIANTS,
    KUMO_DROPDOWN_ITEM_CLASS,
    type KumoDropdownVariant,
  } from "./variants";

  export type DropdownMenuLinkItemProps = Omit<
    DropdownMenuPrimitive.ItemProps,
    "child" | "children"
  > &
    Omit<HTMLAnchorAttributes, "class" | "children"> & {
      children?: Snippet;
      icon?: Snippet;
      inset?: boolean;
      variant?: KumoDropdownVariant;
    };

  let {
    children,
    class: className,
    href,
    icon,
    inset = false,
    target,
    rel,
    variant = KUMO_DROPDOWN_DEFAULT_VARIANTS.variant,
    ...restProps
  }: DropdownMenuLinkItemProps = $props();
</script>

<DropdownMenuPrimitive.Item data-slot="dropdown-menu-link-item" {...restProps}>
  {#snippet child({ props })}
    <a
      {...props}
      {href}
      {target}
      rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
      class={cn(
        KUMO_DROPDOWN_ITEM_CLASS,
        "text-inherit no-underline",
        inset && "pl-8",
        dropdownVariants({ variant }),
        className,
      )}
    >
      {#if icon}
        <span class="mr-2 inline-flex h-4 w-4 items-center justify-center">
          {@render icon()}
        </span>
      {/if}
      {@render children?.()}
    </a>
  {/snippet}
</DropdownMenuPrimitive.Item>
