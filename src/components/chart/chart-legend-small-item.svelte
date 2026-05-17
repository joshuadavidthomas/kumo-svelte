<script lang="ts">
  import { cn } from "../../utils";
  import type { ChartLegendItemProps } from "./legend-types";

  let {
    class: className,
    color,
    inactive = false,
    name,
    value,
  }: ChartLegendItemProps = $props();
</script>

<div class={cn("inline-flex items-center gap-2", className)}>
  <span
    class={cn("inline-block size-2 rounded-full", inactive && "opacity-50")}
    style:background-color={color}
  ></span>
  <span class={cn("text-xs", inactive && "opacity-50")}>{name}</span>
  <span class={cn("text-xs font-medium", inactive && "opacity-50")}>{value}</span>
</div>

