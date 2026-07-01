<script lang="ts">
  import { BubbleMap, type MapGeoJson } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const map: MapGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "North America" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-165, 15], [-50, 15], [-50, 72], [-165, 72], [-165, 15]]],
        },
      },
      {
        type: "Feature",
        properties: { name: "Europe" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-12, 35], [35, 35], [35, 70], [-12, 70], [-12, 35]]],
        },
      },
      {
        type: "Feature",
        properties: { name: "Asia Pacific" },
        geometry: {
          type: "Polygon",
          coordinates: [[[80, -45], [180, -45], [180, 55], [80, 55], [80, -45]]],
        },
      },
      {
        type: "Feature",
        properties: { name: "South America" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-82, -55], [-35, -55], [-35, 12], [-82, 12], [-82, -55]]],
        },
      },
    ],
  };

  const data = [
    { city: "San Jose", requests: 1820000, longitude: -121.9, latitude: 37.3 },
    { city: "Ashburn", requests: 1240000, longitude: -77.5, latitude: 39.0 },
    { city: "London", requests: 980000, longitude: -0.1, latitude: 51.5 },
    { city: "Singapore", requests: 760000, longitude: 103.8, latitude: 1.3 },
    { city: "São Paulo", requests: 520000, longitude: -46.6, latitude: -23.5 },
  ];
</script>

<BubbleMap
  {echarts}
  geoJson={map}
  {data}
  lng="longitude"
  lat="latitude"
  name="city"
  value="requests"
  height={320}
  valueFormat={(value) => `${(value / 1_000_000).toFixed(1)}M requests`}
/>
