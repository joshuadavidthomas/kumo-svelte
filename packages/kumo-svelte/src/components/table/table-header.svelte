<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface TableHeaderProps
    extends Omit<HTMLAttributes<HTMLTableSectionElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
    sticky?: boolean;
    variant?: "default" | "compact";
  }

  let {
    children,
    class: className,
    sticky = false,
    variant = "default",
    ...restProps
  }: TableHeaderProps = $props();

  let isCompact = $derived(variant === "compact");
</script>

<thead
  class={cn(
    "group/header",
    isCompact && "[&_th]:bg-kumo-elevated [&_th]:py-2 text-xs text-kumo-strong",
    sticky && "[&_th]:sticky [&_th]:top-0 [&_th]:z-1",
    className,
  )}
  data-compact={isCompact ? "" : undefined}
  {...restProps}
>
  {@render children?.()}
</thead>
