<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarMenuSubProps
    extends Omit<HTMLAttributes<HTMLUListElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuSubProps = $props();
</script>

<ul
  data-sidebar="menu-sub"
  class={cn(
    "m-0 ml-3.5 flex min-w-0 list-none flex-col gap-0.5 border-l border-kumo-hairline p-0 pl-2.5",
    "group-data-[state=collapsed]/sidebar:hidden",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ul>
