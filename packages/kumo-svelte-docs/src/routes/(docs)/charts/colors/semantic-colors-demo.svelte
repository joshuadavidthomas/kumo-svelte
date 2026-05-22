<script lang="ts">
  import { ChartPalette } from "kumo-svelte/components/chart";
  const colors = ["Attention", "Warning", "Success", "Neutral", "Disabled", "Skeleton"] as const;
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {#each colors as color}
    <div class="flex items-center gap-3 rounded-lg border border-kumo-hairline bg-kumo-base p-3">
      <span class="size-8 rounded-md" style:background-color={ChartPalette.semantic(color)}></span>
      <span class="font-mono text-sm">{color}</span>
    </div>
  {/each}
</div>
