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
    "relative m-0 flex min-w-0 list-none flex-col gap-y-px overflow-hidden p-0 pr-0 pl-7",
    "before:absolute before:inset-y-px before:left-[19px] before:z-10 before:w-px before:bg-kumo-line",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ul>
