<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type SelectValueProps = SelectPrimitive.ValueProps;

  let { class: className, ...restProps }: SelectValueProps = $props();
</script>

<SelectPrimitive.Value
  data-slot="select-value"
  class={cn("min-w-0 truncate data-[placeholder]:text-kumo-placeholder", className)}
  {...restProps}
/>
