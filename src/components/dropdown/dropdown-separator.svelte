<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type DropdownMenuSeparatorProps = DropdownMenuPrimitive.SeparatorProps;

  let { class: className, ...restProps }: DropdownMenuSeparatorProps = $props();
</script>

<DropdownMenuPrimitive.Separator class={cn("-mx-1 my-1 h-px bg-kumo-hairline", className)} {...restProps} />
