<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuCheckboxGroupProps = DropdownMenuPrimitive.CheckboxGroupProps;

  let { children, ...restProps }: DropdownMenuCheckboxGroupProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxGroup data-slot="dropdown-menu-checkbox-group" {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.CheckboxGroup>
