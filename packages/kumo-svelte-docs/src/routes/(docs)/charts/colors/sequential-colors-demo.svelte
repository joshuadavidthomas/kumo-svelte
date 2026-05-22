<script lang="ts">
  import { ChartPalette } from "kumo-svelte/components/chart";
  const steps = ChartPalette.sequential("blues");
</script>

<div class="overflow-hidden rounded-lg border border-kumo-hairline">
  <div class="grid grid-cols-5">
    {#each steps as color, index}
      <div class="flex h-24 items-end p-3" style:background-color={color}>
        <span class="rounded bg-black/50 px-1.5 py-0.5 font-mono text-xs text-white">{index + 1}</span>
      </div>
    {/each}
  </div>
</div>
