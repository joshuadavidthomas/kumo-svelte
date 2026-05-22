<script lang="ts">
  import { ChartLegendLargeItem, ChartPalette } from "kumo-svelte/components/chart";
</script>

<div class="flex flex-wrap gap-6">
  <ChartLegendLargeItem name="Requests" value="12.4M" color={ChartPalette.categorical(0)} />
  <ChartLegendLargeItem name="Cached" value="9.8M" unit="hits" color={ChartPalette.categorical(4)} />
</div>
