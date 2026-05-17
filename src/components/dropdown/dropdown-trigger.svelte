<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuTriggerProps = DropdownMenuPrimitive.TriggerProps;

  let { child, children, ...restProps }: DropdownMenuTriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger {child} {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.Trigger>
