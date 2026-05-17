import type { ComponentProps } from "svelte";
import ChartComponent from "./chart.svelte";
import ChartLegendLargeItemComponent from "./chart-legend-large-item.svelte";
import ChartLegendSmallItemComponent from "./chart-legend-small-item.svelte";
import TimeseriesChartComponent from "./timeseries-chart.svelte";

export { default as Chart } from "./chart.svelte";
export { default as ChartLegendLargeItem } from "./chart-legend-large-item.svelte";
export { default as ChartLegendSmallItem } from "./chart-legend-small-item.svelte";
export { default as TimeseriesChart } from "./timeseries-chart.svelte";
export type ChartProps = ComponentProps<typeof ChartComponent>;
export type ChartLegendLargeItemProps = ComponentProps<typeof ChartLegendLargeItemComponent>;
export type ChartLegendSmallItemProps = ComponentProps<typeof ChartLegendSmallItemComponent>;
export type TimeseriesChartProps = ComponentProps<typeof TimeseriesChartComponent>;
export type TimeseriesData = TimeseriesChartProps["data"][number];
export {
  CHART_DARK_COLORS,
  CHART_LIGHT_COLORS,
  ChartPalette,
  type ChartSemanticColorName,
} from "./color";
export type {
  ChartEvents,
  EChartsMouseEventParams,
  KumoChartOption,
  SafeTooltipOption,
} from "./types";
export type { ChartLegendItemProps } from "./legend-types";
