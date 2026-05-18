<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: DialogFooterProps = $props();
</script>

<div
  data-slot="dialog-footer"
  class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
  {...restProps}
>
  {@render children?.()}
</div>
