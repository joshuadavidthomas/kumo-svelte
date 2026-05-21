import type * as echarts from "echarts/core";
import type { EChartsOption, SetOptionOpts, TooltipComponentOption } from "echarts";

export type EChartsMouseEventParams = {
  color?: string;
  componentType: string;
  data?: unknown;
  dataIndex?: number;
  dataType?: string;
  name?: string;
  seriesIndex?: number;
  seriesName?: string;
  seriesType?: string;
  value?: number | unknown[];
};

export type SafeTooltipOption = Omit<TooltipComponentOption, "formatter"> & {
  dangerousHtmlFormatter?: TooltipComponentOption["formatter"];
};

export type KumoChartOption = {
  [K in keyof EChartsOption]: K extends "tooltip"
    ? SafeTooltipOption | SafeTooltipOption[] | undefined
    : EChartsOption[K];
};

export interface ChartEvents {
  axisareaselected: (params: unknown) => void;
  brush: (params: unknown) => void;
  brushend: (params: {
    areas: Array<{
      brushType?: string;
      coordRange: unknown;
      panelId?: string;
      range?: unknown;
    }>;
  }) => void;
  brushselected: (params: unknown) => void;
  click: (params: EChartsMouseEventParams) => void;
  contextmenu: (params: unknown) => void;
  datarangeselected: (params: unknown) => void;
  datazoom: (params: unknown) => void;
  dataviewchanged: (params: unknown) => void;
  dblclick: (params: EChartsMouseEventParams) => void;
  geoselectchanged: (params: unknown) => void;
  geoselected: (params: unknown) => void;
  geounselected: (params: unknown) => void;
  globalout: (params: unknown) => void;
  legendscroll: (params: unknown) => void;
  legendselectchanged: (params: { name: string; selected: Record<string, boolean> }) => void;
  legendselected: (params: unknown) => void;
  legendunselected: (params: unknown) => void;
  magictypechanged: (params: unknown) => void;
  mapselectchanged: (params: unknown) => void;
  mapselected: (params: unknown) => void;
  mapunselected: (params: unknown) => void;
  mousedown: (params: EChartsMouseEventParams) => void;
  mousemove: (params: EChartsMouseEventParams) => void;
  mouseout: (params: EChartsMouseEventParams) => void;
  mouseover: (params: EChartsMouseEventParams) => void;
  mouseup: (params: EChartsMouseEventParams) => void;
  pieselectchanged: (params: unknown) => void;
  pieselected: (params: unknown) => void;
  pieunselected: (params: unknown) => void;
  restore: (params: unknown) => void;
  timelinechanged: (params: unknown) => void;
  timelineplaychanged: (params: unknown) => void;
}

export interface ChartProps {
  class?: string;
  echarts: typeof echarts;
  height?: number;
  isDarkMode?: boolean;
  onEvents?: Partial<ChartEvents>;
  optionUpdateBehavior?: SetOptionOpts;
  options: KumoChartOption;
  ref?: echarts.ECharts | null;
}
