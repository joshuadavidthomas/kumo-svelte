<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";

  export interface CollapsibleDefaultPanelProps {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    forceMount,
    hiddenUntilFound,
    id,
  }: CollapsibleDefaultPanelProps = $props();
</script>

<CollapsiblePrimitive.Content
  {id}
  {forceMount}
  {hiddenUntilFound}
  class={cn("my-2 space-y-4 border-l-2 border-kumo-fill pl-4", className)}
>
  {@render children?.()}
</CollapsiblePrimitive.Content>
