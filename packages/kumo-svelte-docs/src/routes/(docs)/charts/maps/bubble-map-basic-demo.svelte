<script lang="ts">
  import { mode } from "mode-watcher";
  import { BubbleMap, type MapGeoJson } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  interface Props {
    geoJson: MapGeoJson | null;
  }

  let { geoJson }: Props = $props();
  let isDarkMode = $derived(mode.current === "dark");

  const data = [
    { city: "San Jose", requests: 1820000, longitude: -121.9, latitude: 37.3 },
    { city: "Ashburn", requests: 1240000, longitude: -77.5, latitude: 39.0 },
    { city: "London", requests: 980000, longitude: -0.1, latitude: 51.5 },
    { city: "Singapore", requests: 760000, longitude: 103.8, latitude: 1.3 },
    { city: "São Paulo", requests: 520000, longitude: -46.6, latitude: -23.5 },
  ];
</script>

{#if geoJson}
  <BubbleMap
    {echarts}
    {geoJson}
    {data}
    lng="longitude"
    lat="latitude"
    name="city"
    value="requests"
    {isDarkMode}
    valueFormat={(value) => `${(value / 1_000_000).toFixed(1)}M requests`}
  />
{/if}
