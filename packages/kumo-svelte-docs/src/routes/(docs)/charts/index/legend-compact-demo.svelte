<script lang="ts">
  import { ChartLegendSmallItem, ChartPalette } from "kumo-svelte";
</script>

<div class="flex flex-wrap gap-4">
  <ChartLegendSmallItem name="Success" value="99.98%" color={ChartPalette.semantic("Success")} />
  <ChartLegendSmallItem name="Errors" value="0.02%" color={ChartPalette.semantic("Attention")} />
</div>
