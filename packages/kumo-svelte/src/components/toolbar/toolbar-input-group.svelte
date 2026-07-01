<script lang="ts">
  import InputGroup, { type InputGroupProps } from "../input-group/input-group.svelte";
  import { getToolbarContext } from "./context";
  import { toolbarControlClassName } from "./variants";

  export interface ToolbarInputGroupProps extends Omit<InputGroupProps, "size"> {}

  let {
    class: className,
    children,
    ...restProps
  }: ToolbarInputGroupProps = $props();

  const toolbar = getToolbarContext();
</script>

<InputGroup
  data-kumo-component="Toolbar.InputGroup"
  data-slot="toolbar-input-group"
  class={toolbarControlClassName(className)}
  size={toolbar.size}
  {...restProps}
>
  {@render children()}
</InputGroup>
