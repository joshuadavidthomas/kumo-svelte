<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarMenuBadgeProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuBadgeProps = $props();
</script>

<span
  data-sidebar="menu-badge"
  class={cn(
    "inline-flex shrink-0 select-none items-center rounded-full border border-dashed border-kumo-line",
    "px-1.5 py-0.5 text-[11px]/none font-medium text-kumo-strong",
    "group-data-[state=collapsed]/sidebar:hidden",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</span>
