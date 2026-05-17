<script lang="ts">
  import type * as echarts from "echarts/core";
  import type { BarSeriesOption, LineSeriesOption } from "echarts/charts";
  import type { EChartsOption, SeriesOption, SetOptionOpts } from "echarts";
  import Chart from "./chart.svelte";
  import type { ChartEvents, KumoChartOption } from "./types";

  export interface TimeseriesData {
    color: string;
    data: [number, number][];
    name: string;
  }

  export interface TimeseriesChartProps {
    ariaDescription?: string;
    data: TimeseriesData[];
    echarts: typeof echarts;
    gradient?: boolean;
    height?: number;
    incomplete?: { after?: number; before?: number };
    isDarkMode?: boolean;
    loading?: boolean;
    onTimeRangeChange?: (from: number, to: number) => void;
    optionUpdateBehavior?: SetOptionOpts;
    tooltipValueFormat?: (value: number) => string;
    type?: "bar" | "line";
    xAxisName?: string;
    xAxisTickCount?: number;
    xAxisTickFormat?: (value: number) => string;
    yAxisName?: string;
    yAxisTickCount?: number;
    yAxisTickFormat?: (value: number) => string;
    yAxisTickLabelFormat?: (value: number) => string;
  }

  let {
    ariaDescription,
    data,
    echarts: echartsModule,
    gradient = false,
    height = 350,
    incomplete,
    isDarkMode = false,
    loading = false,
    onTimeRangeChange,
    optionUpdateBehavior,
    tooltipValueFormat,
    type = "line",
    xAxisName,
    xAxisTickCount,
    xAxisTickFormat,
    yAxisName,
    yAxisTickCount,
    yAxisTickFormat,
    yAxisTickLabelFormat,
  }: TimeseriesChartProps = $props();

  let chart = $state<echarts.ECharts | null>(null);
  let incompleteBefore = $derived(incomplete?.before);
  let incompleteAfter = $derived(incomplete?.after);

  let options = $derived.by<KumoChartOption>(() => {
    const transformSeries: Array<BarSeriesOption | LineSeriesOption> = [];
    const seriesType =
      type === "bar"
        ? ({ stack: "total", type: "bar" } as const)
        : ({ showSymbol: false, type: "line" } as const);

    for (const series of data) {
      const incompleteBeforePoints =
        incompleteBefore && type === "line"
          ? series.data.filter((point) => point[0] <= incompleteBefore)
          : [];
      const incompleteAfterPoints =
        incompleteAfter && type === "line"
          ? series.data.filter((point) => point[0] >= incompleteAfter)
          : [];
      const completePoints =
        incompleteBeforePoints.length > 0 || incompleteAfterPoints.length > 0
          ? series.data.slice(
              Math.max(0, incompleteBeforePoints.length - 1),
              Math.max(0, series.data.length - incompleteAfterPoints.length + 1),
            )
          : series.data;
      const areaStyle =
        gradient && type === "line"
          ? {
              color: new echartsModule.graphic.LinearGradient(0, 0, 0, 1, [
                { color: colorWithOpacity(series.color, 0.4), offset: 0 },
                { color: colorWithOpacity(series.color, 0), offset: 1 },
              ]),
            }
          : undefined;

      transformSeries.push({
        color: series.color,
        data: completePoints,
        emphasis: { focus: "series" },
        name: series.name,
        ...(areaStyle ? { areaStyle } : {}),
        ...seriesType,
      });

      const incompleteSeriesConfig = {
        color: series.color,
        emphasis: { focus: "series" as const },
        lineStyle: { type: "dashed" as const },
        name: series.name,
        showSymbol: false,
        type: "line" as const,
      };

      if (incompleteBeforePoints.length > 0) {
        transformSeries.push({
          ...incompleteSeriesConfig,
          data: incompleteBeforePoints,
        });
      }

      if (incompleteAfterPoints.length > 0) {
        transformSeries.push({
          ...incompleteSeriesConfig,
          data: incompleteAfterPoints,
        });
      }
    }

    return {
      aria: {
        enabled: true,
        ...(ariaDescription && { label: { description: ariaDescription } }),
      },
      backgroundColor: "transparent",
      brush: {
        brushMode: "single" as const,
        brushStyle: {
          borderColor: "rgba(120,140,180,0.8)",
          borderWidth: 1,
          color: "rgba(120,140,180,0.3)",
        },
        brushType: "lineX" as const,
        outOfBrush: {
          colorAlpha: 0.3,
        },
        xAxisIndex: "all" as const,
      },
      grid: {
        bottom: xAxisName ? 30 : 24,
        left: yAxisName ? 30 : 24,
        right: 24,
        top: 24,
      },
      series: transformSeries as SeriesOption[],
      toolbox: { show: false },
      tooltip: {
        appendTo: "body",
        axisPointer: { type: "shadow" as const },
        dangerousHtmlFormatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          const seenNames: string[] = [];
          const filteredParams = items.filter((param: any) => {
            if (seenNames.includes(param.seriesName)) return false;
            seenNames.push(param.seriesName);
            return true;
          });
          const first = filteredParams[0] as {
            axisValue?: number;
            value?: [number, number];
          };
          const ts = first?.value?.[0] ?? first?.axisValue;
          const header =
            ts != null
              ? `<div style="font-weight:600;margin-bottom:4px;">${echartsModule.format.encodeHTML(formatTimestamp(ts))}</div>`
              : "";
          const rows = filteredParams
            .map((param: any) => {
              const value = param?.value?.[1];
              const formatFn = tooltipValueFormat ?? yAxisTickLabelFormat;
              const formattedValue = formatFn
                ? echartsModule.format.encodeHTML(String(formatFn(value)))
                : echartsModule.format.encodeHTML(String(value));

              return `${param.marker} ${echartsModule.format.encodeHTML(param.seriesName)}: <strong>${formattedValue}</strong>`;
            })
            .join("<br/>");

          return `${header}${rows}`;
        },
        trigger: "axis" as const,
      },
      xAxis: {
        axisLine: { show: false },
        name: xAxisName,
        nameGap: 30,
        nameLocation: "middle" as const,
        splitLine: {
          show: false,
        },
        splitNumber: xAxisTickCount ?? 5,
        type: "time" as const,
        ...(xAxisTickFormat && {
          axisLabel: {
            formatter: (value: number) => xAxisTickFormat(value),
          },
        }),
      },
      yAxis: {
        axisLabel: {
          margin: 15,
          ...(yAxisTickFormat && {
            formatter: (value: number) => yAxisTickFormat(value),
          }),
        },
        axisTick: { show: true },
        name: yAxisName,
        nameGap: 40,
        nameLocation: "middle" as const,
        splitLine: {
          lineStyle: { type: "dashed" as const, width: 1 },
          show: true,
        },
        splitNumber: yAxisTickCount,
        type: "value" as const,
      },
    };
  });

  let events = $derived<Partial<ChartEvents>>(
    onTimeRangeChange
      ? {
          brushend: (params) => {
            const range = params.areas[0]?.coordRange;
            if (!Array.isArray(range)) return;
            onTimeRangeChange?.(Number(range[0]), Number(range[1]));
            chart?.dispatchAction({ areas: [], type: "brush" });
          },
        }
      : {},
  );

  $effect(() => {
    const instance = chart;
    if (!instance || !onTimeRangeChange || loading) return;

    instance.dispatchAction({
      brushOption: {
        brushMode: "single",
        brushType: "lineX",
      },
      key: "brush",
      type: "takeGlobalCursor",
    });

    return () => {
      instance.dispatchAction({
        brushOption: {
          brushType: false,
        },
        key: "brush",
        type: "takeGlobalCursor",
      });
    };
  });

  function colorWithOpacity(color: string, alpha: number): string {
    const a = Math.max(0, Math.min(1, alpha));
    const rgbMatch = color.match(
      /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i,
    );

    if (rgbMatch) {
      return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${a})`;
    }

    let hex = color.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function pad(n: number) {
    return n.toString().padStart(2, "0");
  }

  function formatTimestamp(ts: number | string | Date): string {
    const date = new Date(ts);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  let wavePath = $derived.by(() => {
    const mid = height / 2;
    const amp = Math.min(height * 0.12, 28);
    const period = 400;
    const steps = 120;
    const points: string[] = [];

    for (let i = 0; i <= steps; i += 1) {
      const x = -period + (i / steps) * period * 3;
      const y = mid + Math.sin((i / steps) * 2 * Math.PI * 3) * amp;
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return points.join(" ");
  });
  let waveStroke = $derived(
    isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)",
  );
</script>

<div class="relative w-full" style:height={`${height}px`}>
  {#if loading}
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden" style:height={`${height}px`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 400 ${height}`}
        preserveAspectRatio="none"
        class="w-full animate-pulse"
      >
        <path
          d={wavePath}
          fill="none"
          stroke={waveStroke}
          stroke-width="2"
          class="kumo-chart-wave"
        />
      </svg>
    </div>
  {:else}
    <Chart
      echarts={echartsModule}
      bind:ref={chart}
      {height}
      isDarkMode={isDarkMode}
      onEvents={events}
      options={options as EChartsOption}
      {optionUpdateBehavior}
    />
  {/if}
</div>

<style>
  .kumo-chart-wave {
    animation: kumo-chart-wave 2.4s linear infinite;
    transform-origin: 0 0;
  }

  @keyframes kumo-chart-wave {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(400px);
    }
  }
</style>
