<script lang="ts">
  import type { Snippet } from "svelte";
  import CaretUpDownIcon from "phosphor-svelte/lib/CaretUpDownIcon";
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import {
    KUMO_SELECT_DEFAULT_VARIANTS,
    KUMO_SELECT_TRIGGER_ICON_STYLES,
    selectVariants,
    type KumoSelectSize,
  } from "./variants";

  export type SelectTriggerProps = SelectPrimitive.TriggerProps & {
    icon?: Snippet;
    loading?: boolean;
    size?: KumoSelectSize;
    showIcon?: boolean;
  };

  let {
    children,
    class: className,
    disabled,
    icon,
    loading = false,
    size = KUMO_SELECT_DEFAULT_VARIANTS.size,
    showIcon = true,
    ...restProps
  }: SelectTriggerProps = $props();

  let iconStyle = $derived(KUMO_SELECT_TRIGGER_ICON_STYLES[size]);
</script>

<SelectPrimitive.Trigger
  data-slot="select-trigger"
  data-size={size}
  class={cn(
    selectVariants({ size }),
    (disabled || loading) && "cursor-not-allowed opacity-50",
    className,
  )}
  disabled={disabled || loading}
  {...restProps}
>
  {@render children?.()}
  {#if showIcon}
    <span class={cn("flex shrink-0 items-center", iconStyle.className)}>
      {#if icon}
        {@render icon()}
      {:else}
        <CaretUpDownIcon aria-hidden="true" size={iconStyle.iconSize} weight="bold" />
      {/if}
    </span>
  {/if}
</SelectPrimitive.Trigger>
