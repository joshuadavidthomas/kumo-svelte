<script lang="ts">
  import { TimeseriesChart } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";
  import { timeseriesData } from "../chart-data";

  const firstSeries = timeseriesData[0];
  const before = firstSeries.data[2]?.[0];
  const after = firstSeries.data[9]?.[0];
</script>

<TimeseriesChart {echarts} data={timeseriesData} height={300} incomplete={{ before, after }} />
