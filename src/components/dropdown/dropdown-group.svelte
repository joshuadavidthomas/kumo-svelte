<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuGroupProps = DropdownMenuPrimitive.GroupProps;

  let { children, ...restProps }: DropdownMenuGroupProps = $props();
</script>

<DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.Group>
