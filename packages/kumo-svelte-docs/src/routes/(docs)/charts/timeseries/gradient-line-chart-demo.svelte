<script lang="ts">
  import { TimeseriesChart, ChartPalette, type TimeseriesData } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const start = Date.UTC(2026, 0, 1, 0, 0, 0);
  const timeseriesData: TimeseriesData[] = [
    {
      name: "Requests",
      color: ChartPalette.categorical(0),
      data: Array.from({ length: 12 }, (_, index) => [
        start + index * 60 * 60 * 1000,
        120 + index * 16 + Math.round(Math.sin(index) * 30),
      ]),
    },
    {
      name: "Cached",
      color: ChartPalette.categorical(4),
      data: Array.from({ length: 12 }, (_, index) => [
        start + index * 60 * 60 * 1000,
        80 + index * 10 + Math.round(Math.cos(index) * 18),
      ]),
    },
  ];
</script>

<TimeseriesChart {echarts} data={timeseriesData} height={300} gradient />
