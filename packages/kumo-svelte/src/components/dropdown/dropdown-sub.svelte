<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  export type DropdownMenuSubProps = DropdownMenuPrimitive.SubProps;

  let { children, open = $bindable(false), ...restProps }: DropdownMenuSubProps = $props();
</script>

<DropdownMenuPrimitive.Sub bind:open {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.Sub>
