<script lang="ts">
  import { SankeyChart, type SankeyTooltipParams } from "kumo-svelte";
  import { echarts } from "../chart-echarts";
  import { sankeyLinks, sankeyNodes } from "../chart-data";

  function tooltipFormatter(params: SankeyTooltipParams) {
    if (params.type === "node" && params.node) {
      return `<strong>${params.name}</strong><br>${params.node.value?.toLocaleString() ?? ""}`;
    }
    if (params.type === "link" && params.link) {
      return `${params.link.source} → ${params.link.target}<br><strong>${params.link.value.toLocaleString()}</strong>`;
    }
    return "";
  }
</script>

<SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={300} {tooltipFormatter} />
