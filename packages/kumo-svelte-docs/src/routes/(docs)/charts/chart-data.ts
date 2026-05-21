import {
  ChartPalette,
  type SankeyLinkData,
  type SankeyNodeData,
  type TimeseriesData,
} from "kumo-svelte";

const start = Date.UTC(2026, 0, 1, 0, 0, 0);

export const timeseriesData: TimeseriesData[] = [
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

export const sankeyNodes: SankeyNodeData[] = [
  { name: "Users", value: 103600, color: ChartPalette.categorical(0) },
  { name: "Devices", value: 50800, color: ChartPalette.categorical(1) },
  { name: "Apps", value: 122600, color: ChartPalette.categorical(2) },
  { name: "Tunnels", value: 31800, color: ChartPalette.categorical(3) },
];

export const sankeyLinks: SankeyLinkData[] = [
  { source: 0, target: 2, value: 80000 },
  { source: 0, target: 3, value: 23600 },
  { source: 1, target: 2, value: 42600 },
  { source: 1, target: 3, value: 8200 },
];
