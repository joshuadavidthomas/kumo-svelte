<script lang="ts">
  import type { Snippet } from "svelte";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import MinusIcon from "phosphor-svelte/lib/MinusIcon";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type DropdownMenuCheckboxItemProps = Omit<
    DropdownMenuPrimitive.CheckboxItemProps,
    "children"
  > & {
    children?: Snippet;
  };

  let {
    checked = $bindable(false),
    children: childrenProp,
    class: className,
    indeterminate = $bindable(false),
    ...restProps
  }: DropdownMenuCheckboxItemProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  data-slot="dropdown-menu-checkbox-item"
  bind:checked
  bind:indeterminate
  class={cn(
    "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-base outline-none transition-colors select-none",
    "focus:bg-kumo-tint focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-inherit">
      {#if indeterminate}
        <MinusIcon aria-hidden="true" size={16} weight="bold" />
      {:else if checked}
        <CheckIcon aria-hidden="true" size={16} weight="bold" />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
