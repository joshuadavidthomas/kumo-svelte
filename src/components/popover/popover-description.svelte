<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface PopoverDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: PopoverDescriptionProps = $props();
</script>

<p
  data-slot="popover-description"
  class={cn("m-0 text-base leading-6 text-kumo-subtle", className)}
  {...restProps}
>
  {@render children?.()}
</p>
