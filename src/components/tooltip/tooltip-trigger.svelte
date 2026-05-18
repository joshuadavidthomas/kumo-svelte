<script lang="ts">
  import { Tooltip as TooltipPrimitive } from "bits-ui";

  export type TooltipTriggerProps = TooltipPrimitive.TriggerProps;

  let { children, ...restProps }: TooltipTriggerProps = $props();
</script>

<TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...restProps}>
  {@render children?.()}
</TooltipPrimitive.Trigger>
