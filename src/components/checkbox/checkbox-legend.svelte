<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";

  export interface CheckboxLegendProps
    extends Omit<HTMLAttributes<HTMLLegendElement>, "class" | "children"> {
    children: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: CheckboxLegendProps = $props();
</script>

<legend
  data-slot="checkbox-legend"
  class={cn("text-base font-medium text-kumo-default", className)}
  {...restProps}
>
  {@render children()}
</legend>
