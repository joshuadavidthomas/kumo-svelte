<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";

  export type SelectRootProps = SelectPrimitive.RootProps;

  let {
    children,
    open = $bindable(false),
    value = $bindable(),
    ...restProps
  }: SelectRootProps = $props();
</script>

<SelectPrimitive.Root bind:open bind:value={value as never} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Root>
