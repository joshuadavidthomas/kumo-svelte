<script lang="ts">
  import { Tooltip as TooltipPrimitive } from "bits-ui";

  export type TooltipTriggerProps = TooltipPrimitive.TriggerProps;

  let { children, ref = $bindable(null), ...restProps }: TooltipTriggerProps = $props();
</script>

<TooltipPrimitive.Trigger data-slot="tooltip-trigger" bind:ref {...restProps}>
  {@render children?.()}
</TooltipPrimitive.Trigger>
