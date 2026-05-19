<script lang="ts">
  import { TimeseriesChart } from "kumo-svelte";
  import { echarts } from "../chart-echarts";
  import { timeseriesData } from "../chart-data";

  let range = $state("");
</script>

<div class="space-y-3">
  <TimeseriesChart
    {echarts}
    data={timeseriesData}
    height={300}
    onTimeRangeChange={(from, to) => (range = `${new Date(from).toLocaleTimeString()} – ${new Date(to).toLocaleTimeString()}`)}
  />
  <p class="text-sm text-kumo-subtle">Selected range: {range || "Drag across the chart"}</p>
</div>
