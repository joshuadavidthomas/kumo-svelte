<script lang="ts">
  import Input, { type InputProps } from "../input/input.svelte";
  import { getToolbarContext } from "./context";
  import { toolbarControlClassName } from "./variants";

  export interface ToolbarInputProps
    extends Omit<
      InputProps,
      | "description"
      | "error"
      | "hideLabel"
      | "label"
      | "labelTooltip"
      | "passwordManagerIgnore"
      | "render"
      | "size"
      | "variant"
    > {
    focusableWhenDisabled?: boolean;
  }

  let {
    class: className,
    disabled = false,
    focusableWhenDisabled = false,
    readonly = false,
    value = $bindable(),
    ...restProps
  }: ToolbarInputProps = $props();

  const toolbar = getToolbarContext();
  let disabledState = $derived(Boolean(disabled));
  let nativeDisabled = $derived(disabledState && !focusableWhenDisabled);
  let inputReadonly = $derived(readonly || (disabledState && focusableWhenDisabled));
</script>

<Input
  data-kumo-component="Toolbar.Input"
  data-slot="toolbar-input"
  bind:value
  aria-disabled={disabledState ? "true" : undefined}
  class={toolbarControlClassName(className)}
  disabled={nativeDisabled}
  readonly={inputReadonly}
  size={toolbar.size}
  {...restProps}
/>
