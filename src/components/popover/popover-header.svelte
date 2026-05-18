<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface PopoverHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: PopoverHeaderProps = $props();
</script>

<div data-slot="popover-header" class={cn("flex flex-col gap-1", className)} {...restProps}>
  {@render children?.()}
</div>
