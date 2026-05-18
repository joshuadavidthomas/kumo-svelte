<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type SelectViewportProps = SelectPrimitive.ViewportProps;

  let { children, class: className, ...restProps }: SelectViewportProps = $props();
</script>

<SelectPrimitive.Viewport
  data-slot="select-viewport"
  class={cn("min-h-0 flex-1 overflow-y-auto overscroll-none scroll-pt-2 scroll-pb-2", className)}
  {...restProps}
>
  {@render children?.()}
</SelectPrimitive.Viewport>
