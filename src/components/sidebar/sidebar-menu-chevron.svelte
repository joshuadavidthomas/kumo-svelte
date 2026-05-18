<script lang="ts">
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import { cn } from "../../utils";

  export interface SidebarMenuChevronProps {
    class?: string;
  }

  let { class: className }: SidebarMenuChevronProps = $props();
</script>

<CaretRightIcon
  class={cn(
    "ml-auto size-4 shrink-0 text-kumo-subtle transition-transform duration-200",
    "group-data-[state=open]/menu-button:rotate-90",
    "group-data-[state=collapsed]/sidebar:hidden",
    className,
  )}
/>
