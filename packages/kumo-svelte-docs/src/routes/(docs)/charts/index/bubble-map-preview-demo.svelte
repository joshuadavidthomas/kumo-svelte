<script lang="ts">
  import { BubbleMap, type MapGeoJson } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const map: MapGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "World" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-170, -55], [180, -55], [180, 75], [-170, 75], [-170, -55]]],
        },
      },
    ],
  };

  const data = [
    { name: "SJC", value: 92, longitude: -121.9, latitude: 37.3 },
    { name: "LHR", value: 84, longitude: -0.5, latitude: 51.5 },
    { name: "SIN", value: 76, longitude: 103.8, latitude: 1.3 },
    { name: "SYD", value: 46, longitude: 151.2, latitude: -33.9 },
  ];
</script>

<BubbleMap
  {echarts}
  geoJson={map}
  {data}
  lng="longitude"
  lat="latitude"
  name="name"
  value="value"
  height={180}
  roam={false}
  showTooltip={false}
/>
