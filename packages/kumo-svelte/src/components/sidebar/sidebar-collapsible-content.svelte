<script lang="ts">
  import { tick } from "svelte";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";
  import type { ComponentProps } from "svelte";
  import { cn } from "../../utils";
  import { useSidebar, useSidebarCollapsible } from "./context.svelte";

  export interface SidebarCollapsibleContentProps
    extends ComponentProps<typeof CollapsiblePrimitive.Content> {
    class?: string;
  }

  let { class: className, ref = $bindable(null), ...restProps }: SidebarCollapsibleContentProps = $props();
  const sidebar = useSidebar("SidebarCollapsibleContent");
  const collapsible = useSidebarCollapsible();

  $effect(() => {
    if (!collapsible.open || !collapsible.autoScrollOnOpen || sidebar.state === "collapsed") return;

    tick().then(() => {
      ref?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });
</script>

<CollapsiblePrimitive.Content
  bind:ref
  data-slot="sidebar-collapsible-content"
  aria-hidden={!collapsible.open || sidebar.state === "collapsed"}
  inert={!collapsible.open || sidebar.state === "collapsed"}
  class={cn(
    "overflow-hidden transition-[height] duration-(--sidebar-animation-duration) ease-(--sidebar-easing)",
    "motion-reduce:transition-none",
    sidebar.state === "collapsed" && "hidden",
    className,
  )}
  {...restProps}
/>
