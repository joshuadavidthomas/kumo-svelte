<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import { getRadioGroupContext } from "./context";

  export interface RadioLegendProps {
    children: Snippet;
    class?: string;
    id?: string;
  }

  let { children, class: className, id: idProp }: RadioLegendProps = $props();

  const group = getRadioGroupContext();
  let id = $derived(idProp ?? group.legendId);
</script>

<div id={id} data-slot="radio-group-legend" class={cn("text-base font-medium text-kumo-default", className)}>
  {@render children()}
</div>
