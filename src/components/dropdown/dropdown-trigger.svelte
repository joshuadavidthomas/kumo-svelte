<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuTriggerProps = DropdownMenuPrimitive.TriggerProps;

  let { child, children, ...restProps }: DropdownMenuTriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {child} {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.Trigger>
