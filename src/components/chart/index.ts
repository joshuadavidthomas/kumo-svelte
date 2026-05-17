import type { ComponentProps } from "svelte";
import ChartComponent from "./chart.svelte";

export { default as Chart } from "./chart.svelte";
export type ChartProps = ComponentProps<typeof ChartComponent>;
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
