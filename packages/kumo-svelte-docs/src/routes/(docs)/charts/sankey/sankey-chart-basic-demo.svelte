<script lang="ts">
  import { SankeyChart } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";
  import { sankeyLinks, sankeyNodes } from "../chart-data";
</script>

<SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={300} />
