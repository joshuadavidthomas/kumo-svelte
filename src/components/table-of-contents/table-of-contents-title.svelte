<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface TableOfContentsTitleProps
    extends Omit<HTMLAttributes<HTMLParagraphElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: TableOfContentsTitleProps = $props();
</script>

<p
  data-slot="table-of-contents-title"
  class={cn("mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase", className)}
  {...restProps}
>
  {@render children?.()}
</p>
