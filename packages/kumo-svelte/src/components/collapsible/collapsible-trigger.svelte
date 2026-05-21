<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export type CollapsibleTriggerProps = CollapsiblePrimitive.TriggerProps;

  let { children, class: className, ...restProps }: CollapsibleTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-slot="collapsible-trigger"
  {...restProps}
  class={cn("cursor-pointer", className)}
>
  {@render children?.()}
</CollapsiblePrimitive.Trigger>
