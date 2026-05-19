<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface AutocompleteEmptyProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: AutocompleteEmptyProps = $props();
</script>

<div
  data-slot="autocomplete-empty"
  class={cn("px-3 py-2 text-sm text-kumo-subtle", className)}
  {...restProps}
>
  {@render children?.()}
</div>
