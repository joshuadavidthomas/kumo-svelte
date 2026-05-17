<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface DropdownMenuShortcutProps extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: DropdownMenuShortcutProps = $props();
</script>

<span class={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...restProps}>
  {@render children?.()}
</span>
