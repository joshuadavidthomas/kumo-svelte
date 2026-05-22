<script lang="ts">
  import { Chart, ChartPalette, type KumoChartOption } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const options = {
    aria: { enabled: true },
    series: [
      {
        type: "pie" as const,
        radius: "70%",
        data: ["Workers", "KV", "R2", "D1"].map((name, index) => ({
          name,
          value: [45, 25, 18, 12][index],
          itemStyle: { color: ChartPalette.categorical(index) },
        })),
      },
    ],
    tooltip: { trigger: "item" as const },
  } satisfies KumoChartOption;
</script>

<Chart {echarts} {options} height={300} />
