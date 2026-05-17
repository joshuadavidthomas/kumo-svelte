<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type SelectGroupHeadingProps = SelectPrimitive.GroupHeadingProps;

  let { children, class: className, ...restProps }: SelectGroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
  class={cn("px-3.5 py-1.5 text-sm font-semibold text-kumo-subtle", className)}
  {...restProps}
>
  {@render children?.()}
</SelectPrimitive.GroupHeading>
