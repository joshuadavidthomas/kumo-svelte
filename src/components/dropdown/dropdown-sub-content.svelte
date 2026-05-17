<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { KUMO_DROPDOWN_CONTENT_CLASS } from "./variants";

  export type DropdownMenuSubContentProps = DropdownMenuPrimitive.SubContentProps;

  let { children, class: className, sideOffset = 8, ...restProps }: DropdownMenuSubContentProps =
    $props();
</script>

<DropdownMenuPrimitive.SubContent
  {sideOffset}
  class={cn(KUMO_DROPDOWN_CONTENT_CLASS, className)}
  {...restProps}
>
  {@render children?.()}
</DropdownMenuPrimitive.SubContent>
