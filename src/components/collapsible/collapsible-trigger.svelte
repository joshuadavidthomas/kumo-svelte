<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CollapsibleTriggerProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id,
  }: CollapsibleTriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger
  {id}
  {disabled}
  class={cn("cursor-pointer", className)}
>
  {@render children?.()}
</CollapsiblePrimitive.Trigger>
