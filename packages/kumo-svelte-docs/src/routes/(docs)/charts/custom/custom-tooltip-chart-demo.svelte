<script lang="ts">
  import { Chart, ChartPalette, type KumoChartOption } from "kumo-svelte";
  import { echarts } from "../chart-echarts";

  const options = {
    aria: { enabled: true },
    series: [
      {
        type: "pie" as const,
        radius: ["45%", "70%"],
        data: ["Workers", "KV", "R2", "D1"].map((name, index) => ({
          name,
          value: [45, 25, 18, 12][index],
          itemStyle: { color: ChartPalette.categorical(index) },
        })),
      },
    ],
    tooltip: {
      trigger: "item" as const,
      dangerousHtmlFormatter: (params) => {
        const item = Array.isArray(params) ? params[0] : params;
        const name = typeof item?.name === "string" ? item.name : "";
        const value = typeof item?.value === "number" ? item.value : 0;
        return `<strong>${echarts.format.encodeHTML(name)}</strong><br>${value}%`;
      },
    },
  } satisfies KumoChartOption;
</script>

<Chart {echarts} {options} height={300} />
