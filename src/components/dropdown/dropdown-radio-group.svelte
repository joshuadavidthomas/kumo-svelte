<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.RadioGroupProps;

  let { children, value = $bindable(""), ...restProps }: DropdownMenuRadioGroupProps = $props();
</script>

<DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" bind:value {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.RadioGroup>
