<script lang="ts">
  import { BubbleMap, ChartPalette, type MapGeoJson } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const map: MapGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Global backbone" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-170, -55], [180, -55], [180, 75], [-170, 75], [-170, -55]]],
        },
      },
    ],
  };

  const data = [
    { colo: "SJC", region: "Americas", load: 92, longitude: -121.9, latitude: 37.3 },
    { colo: "DFW", region: "Americas", load: 71, longitude: -97.0, latitude: 32.8 },
    { colo: "LHR", region: "Europe", load: 84, longitude: -0.5, latitude: 51.5 },
    { colo: "AMS", region: "Europe", load: 63, longitude: 4.8, latitude: 52.3 },
    { colo: "SIN", region: "Asia Pacific", load: 88, longitude: 103.8, latitude: 1.3 },
    { colo: "SYD", region: "Asia Pacific", load: 46, longitude: 151.2, latitude: -33.9 },
  ];

  function colorFor(row: (typeof data)[number]) {
    if (row.load >= 85) return ChartPalette.semantic("Attention");
    if (row.load >= 70) return ChartPalette.semantic("Warning");
    return ChartPalette.semantic("Success");
  }
</script>

<BubbleMap
  {echarts}
  geoJson={map}
  mapName="docs-colo-load"
  {data}
  lng="longitude"
  lat="latitude"
  name="colo"
  value="load"
  minRadius={5}
  maxRadius={22}
  bubbleColor={colorFor}
  bubbleBorderColor="var(--color-kumo-base)"
  bubbleBorderWidth={2}
  height={280}
  valueFormat={(value) => `${value}% load`}
  tooltipFormatter={(row) => `<strong>${row.colo}</strong><br><span>${row.region}</span><br>${row.load}% load`}
/>
