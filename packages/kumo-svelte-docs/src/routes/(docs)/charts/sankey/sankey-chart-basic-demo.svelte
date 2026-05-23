<script lang="ts">
  import { SankeyChart, ChartPalette } from "kumo-svelte/components/chart";
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
</script>

<SankeyChart {echarts} nodes={sankeyNodes} links={sankeyLinks} height={300} />
