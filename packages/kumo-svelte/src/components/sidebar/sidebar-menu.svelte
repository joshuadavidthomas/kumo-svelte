<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";

  export interface SidebarMenuProps
    extends Omit<HTMLAttributes<HTMLUListElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: SidebarMenuProps = $props();
</script>

<ul
  data-sidebar="menu"
  class={cn(
    "m-0 flex min-w-0 list-none flex-col items-stretch gap-y-px p-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ul>
