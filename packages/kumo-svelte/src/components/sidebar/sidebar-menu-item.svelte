<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLiAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setSidebarMenuItemContext } from "./context.svelte";

  export interface SidebarMenuItemProps
    extends Omit<HTMLLiAttributes, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuItemProps = $props();

  setSidebarMenuItemContext(true);
</script>

<li data-sidebar="menu-item" class={cn("relative", className)} {...restProps}>
  {@render children?.()}
</li>
