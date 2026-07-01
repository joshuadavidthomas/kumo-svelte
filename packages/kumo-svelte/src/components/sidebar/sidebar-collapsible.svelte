<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import { setSidebarCollapsibleContext } from "./context.svelte";

  export interface SidebarCollapsibleProps {
    autoScrollOnOpen?: boolean;
    children: Snippet;
    class?: string;
    defaultOpen?: boolean;
    disabled?: boolean;
    id?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }

  let {
    autoScrollOnOpen = false,
    children,
    class: className,
    defaultOpen = false,
    disabled = false,
    id,
    open = $bindable(defaultOpen),
    onOpenChange,
    onOpenChangeComplete,
  }: SidebarCollapsibleProps = $props();

  setSidebarCollapsibleContext({
    get autoScrollOnOpen() {
      return autoScrollOnOpen;
    },
    get open() {
      return open;
    },
  });
</script>

<CollapsiblePrimitive.Root
  bind:open
  data-slot="sidebar-collapsible"
  {disabled}
  {id}
  {onOpenChange}
  {onOpenChangeComplete}
  class={className}
>
  {@render children()}
</CollapsiblePrimitive.Root>
