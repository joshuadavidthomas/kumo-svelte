<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";

  export type SelectRootProps = SelectPrimitive.RootProps;

  let {
    children,
    onValueChange,
    open = $bindable(false),
    value = $bindable(),
    ...restProps
  }: SelectRootProps = $props();

  function handleValueChange(nextValue: string | string[] | undefined) {
    value = nextValue;
    onValueChange?.(nextValue as never);
  }
</script>

<SelectPrimitive.Root
  bind:open
  value={value as never}
  {...restProps}
  onValueChange={handleValueChange}
>
  {@render children?.()}
</SelectPrimitive.Root>
