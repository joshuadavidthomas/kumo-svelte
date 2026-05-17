<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type DropdownMenuLabelProps = DropdownMenuPrimitive.GroupHeadingProps & {
    inset?: boolean;
  };

  let { class: className, inset = false, ...restProps }: DropdownMenuLabelProps = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
  class={cn("px-2 py-1.5 text-base font-semibold", inset && "pl-8", className)}
  {...restProps}
/>
