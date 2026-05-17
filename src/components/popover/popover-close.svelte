<script lang="ts">
  import { Popover as PopoverPrimitive } from "bits-ui";

  export type PopoverCloseProps = PopoverPrimitive.CloseProps;

  let { child, children, ...restProps }: PopoverCloseProps = $props();
</script>

<PopoverPrimitive.Close {child} {...restProps}>
  {@render children?.()}
</PopoverPrimitive.Close>
