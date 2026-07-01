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
    "ml-auto size-3 shrink-0 opacity-40 transition-[transform,rotate,opacity] duration-200",
    "group-hover/menu-button:opacity-100 group-data-[state=open]/menu-button:rotate-90",
    "group-data-[state=collapsed]/sidebar:hidden",
    className,
  )}
/>
