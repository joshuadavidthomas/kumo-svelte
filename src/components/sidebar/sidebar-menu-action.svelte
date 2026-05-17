<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarMenuActionProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuActionProps = $props();
</script>

<button
  type="button"
  data-sidebar="menu-action"
  class={cn(
    "absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1",
    "text-kumo-subtle hover:bg-kumo-overlay",
    "focus-visible:ring-2 focus-visible:ring-kumo-brand",
    "transition-colors duration-150",
    "group-data-[state=collapsed]/sidebar:hidden",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</button>
