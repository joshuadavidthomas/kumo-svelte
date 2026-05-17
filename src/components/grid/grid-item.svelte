<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getGridContext } from "./context";
  import { gridItemVariants } from "./variants";

  export interface GridItemProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: GridItemProps = $props();

  const grid = getGridContext();
</script>

<div
  class={cn(
    gridItemVariants({ variant: grid?.variant, mobileDivider: grid?.mobileDivider }),
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
