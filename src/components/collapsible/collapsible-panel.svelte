<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  export interface CollapsiblePanelProps {
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
  }: CollapsiblePanelProps = $props();
</script>

<CollapsiblePrimitive.Content
  {id}
  {forceMount}
  {hiddenUntilFound}
  class={className}
>
  {@render children?.()}
</CollapsiblePrimitive.Content>
