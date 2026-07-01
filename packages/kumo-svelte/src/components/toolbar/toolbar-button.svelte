<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Loader from "../loader/loader.svelte";
  import { buttonVariants, type KumoButtonShape } from "../button";
  import { cn } from "../../utils/cn";
  import { getToolbarContext } from "./context";
  import { toolbarControlClassName } from "./variants";

  export interface ToolbarButtonProps
    extends Omit<HTMLButtonAttributes, "class" | "children" | "size"> {
    children?: Snippet;
    class?: string;
    focusableWhenDisabled?: boolean;
    icon?: Component;
    loading?: boolean;
    shape?: KumoButtonShape;
  }

  let {
    children,
    class: className,
    disabled = false,
    focusableWhenDisabled = false,
    icon: Icon,
    loading = false,
    onclick,
    onkeydown,
    shape,
    type = "button",
    ...restProps
  }: ToolbarButtonProps = $props();

  const toolbar = getToolbarContext();
  const spinnerSizes = {
    xs: 12,
    sm: 14,
    base: 14,
    lg: 16,
  } as const;

  let disabledState = $derived(Boolean(disabled || loading));
  let nativeDisabled = $derived(disabledState && !focusableWhenDisabled);
  let resolvedShape = $derived(shape ?? (!children && Icon ? "square" : "base"));
  let buttonClass = $derived(
    cn(
      buttonVariants({ variant: "ghost", size: toolbar.size, shape: resolvedShape }),
      toolbarControlClassName(className),
      disabledState && "cursor-not-allowed opacity-50",
    ),
  );

  function preventDisabledEvent(event: Event) {
    if (!disabledState || nativeDisabled) return false;

    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (preventDisabledEvent(event)) return;
    onclick?.(event);
  }

  function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (preventDisabledEvent(event)) return;
    onkeydown?.(event);
  }
</script>

<button
  data-kumo-component="Toolbar.Button"
  data-slot="toolbar-button"
  data-shape={resolvedShape}
  data-size={toolbar.size}
  data-variant="ghost"
  aria-disabled={disabledState ? "true" : undefined}
  class={buttonClass}
  disabled={nativeDisabled}
  {type}
  onclick={handleClick}
  onkeydown={handleKeydown}
  {...restProps}
>
  {#if loading}
    <Loader size={spinnerSizes[toolbar.size]} aria-hidden="true" />
  {:else if Icon}
    <Icon aria-hidden="true" />
  {/if}

  {#if children}
    <span class="contents">
      {@render children()}
    </span>
  {/if}
</button>
