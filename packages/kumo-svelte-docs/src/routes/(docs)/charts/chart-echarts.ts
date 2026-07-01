import {
  BarChart,
  LineChart,
  MapChart,
  PieChart,
  SankeyChart as EChartsSankeyChart,
  ScatterChart,
} from "echarts/charts";
import {
  AriaComponent,
  AxisPointerComponent,
  BrushComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  AriaComponent,
  AxisPointerComponent,
  BarChart,
  BrushComponent,
  CanvasRenderer,
  EChartsSankeyChart,
  GeoComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart,
  ToolboxComponent,
  TooltipComponent,
]);

export { echarts };
