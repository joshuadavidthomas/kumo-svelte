<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface PopoverTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: PopoverTitleProps = $props();
</script>

<h3 class={cn("m-0 text-base font-medium leading-6", className)} {...restProps}>
  {@render children?.()}
</h3>
