<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface TableOfContentsListProps
    extends Omit<HTMLAttributes<HTMLUListElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: TableOfContentsListProps = $props();
</script>

<ul
  data-slot="table-of-contents-list"
  class={cn("flex flex-col gap-2 border-l-2 border-kumo-hairline", className)}
  {...restProps}
>
  {@render children?.()}
</ul>
