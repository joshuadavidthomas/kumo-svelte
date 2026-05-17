<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon.svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type DropdownMenuRadioItemProps = Omit<DropdownMenuPrimitive.RadioItemProps, "children"> & {
    children?: Snippet<[checked: boolean]>;
    icon?: Snippet;
    inset?: boolean;
  };

  let {
    children: childrenProp,
    class: className,
    icon,
    inset = false,
    ...restProps
  }: DropdownMenuRadioItemProps = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  class={cn(
    "relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-none select-none",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-tint",
    inset && "pl-8",
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    {#if icon}
      <span class="mr-2 inline-flex h-4 w-4 items-center justify-center">
        {@render icon()}
      </span>
    {/if}
    {@render childrenProp?.(checked)}
    {#if checked}
      <span class="ml-auto inline-flex">
        <CheckIcon aria-hidden="true" size={16} weight="bold" />
      </span>
    {/if}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
