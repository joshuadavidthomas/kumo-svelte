<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: DialogHeaderProps = $props();
</script>

<div data-slot="dialog-header" class={cn("flex flex-col gap-2", className)} {...restProps}>
  {@render children?.()}
</div>
