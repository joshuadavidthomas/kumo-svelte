<script lang="ts">
  import { TimeseriesChart } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";
  import { timeseriesData } from "../chart-data";
</script>

<TimeseriesChart {echarts} data={timeseriesData} height={220} yAxisTickFormat={(value) => `${Math.round(value / 10)}k`} />
