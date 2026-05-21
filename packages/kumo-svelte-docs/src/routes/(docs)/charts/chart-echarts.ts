import { BarChart, LineChart, PieChart, SankeyChart as EChartsSankeyChart } from "echarts/charts";
import {
  AriaComponent,
  AxisPointerComponent,
  BrushComponent,
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
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  ToolboxComponent,
  TooltipComponent,
]);

export { echarts };
