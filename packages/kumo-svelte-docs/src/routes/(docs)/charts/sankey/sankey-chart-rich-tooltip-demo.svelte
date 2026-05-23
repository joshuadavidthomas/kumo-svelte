<script lang="ts">
  import { SankeyChart, type SankeyTooltipParams, ChartPalette } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const sankeyLinks = [
    { source: 0, target: 2, value: 80000 },
    { source: 0, target: 3, value: 23600 },
    { source: 1, target: 2, value: 42600 },
    { source: 1, target: 3, value: 8200 },
  ];

  const sankeyNodes = [
    { name: "Users", value: 103600, color: ChartPalette.categorical(0) },
    { name: "Devices", value: 50800, color: ChartPalette.categorical(1) },
    { name: "Apps", value: 122600, color: ChartPalette.categorical(2) },
    { name: "Tunnels", value: 31800, color: ChartPalette.categorical(3) },
  ];

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
