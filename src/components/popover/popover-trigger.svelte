<script lang="ts">
  import { Popover as PopoverPrimitive } from "bits-ui";

  export type PopoverTriggerProps = PopoverPrimitive.TriggerProps;

  let { child, children, ...restProps }: PopoverTriggerProps = $props();
</script>

<PopoverPrimitive.Trigger data-slot="popover-trigger" {child} {...restProps}>
  {@render children?.()}
</PopoverPrimitive.Trigger>
