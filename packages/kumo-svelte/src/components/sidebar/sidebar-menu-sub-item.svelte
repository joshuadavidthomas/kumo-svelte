<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLiAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setSidebarMenuSubItemContext } from "./context.svelte";

  export interface SidebarMenuSubItemProps
    extends Omit<HTMLLiAttributes, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuSubItemProps = $props();

  setSidebarMenuSubItemContext(true);
</script>

<li data-sidebar="menu-sub-item" class={cn("relative", className)} {...restProps}>
  {@render children?.()}
</li>
