<script lang="ts">
  import type * as echarts from "echarts/core";
  import type { EChartsOption } from "echarts";
  import { cn } from "../../utils";
  import { CHART_DARK_COLORS, CHART_LIGHT_COLORS } from "./color";
  import type { ChartEvents, ChartProps, KumoChartOption, SafeTooltipOption } from "./types";

  let {
    class: className,
    className: legacyClassName,
    echarts: echartsModule,
    height = 350,
    isDarkMode = false,
    onEvents,
    optionUpdateBehavior,
    options,
    ref = $bindable(null),
  }: ChartProps = $props();

  let element = $state<HTMLDivElement | null>(null);
  let chart = $state<echarts.ECharts | null>(null);

  const transformTooltip = (tooltipObj: SafeTooltipOption) => {
    const { dangerousHtmlFormatter, ...restOfTooltip } = tooltipObj;
    return {
      ...restOfTooltip,
      formatter: dangerousHtmlFormatter,
    };
  };

  function prepareChartOptions(options: KumoChartOption): EChartsOption {
    if (!options.tooltip) return options;

    return {
      ...options,
      tooltip: Array.isArray(options.tooltip)
        ? options.tooltip.map(transformTooltip)
        : transformTooltip(options.tooltip),
    };
  }

  $effect(() => {
    const container = element;
    const echarts = echartsModule;
    const darkMode = isDarkMode;

    if (!container) return;

    const instance = echarts.init(
      container,
      darkMode
        ? "dark"
        : {
            color: darkMode ? CHART_DARK_COLORS : CHART_LIGHT_COLORS,
          },
    );

    chart = instance;
    ref = instance;

    return () => {
      ref = null;
      chart = null;
      instance.dispose();
    };
  });

  $effect(() => {
    chart?.setOption(prepareChartOptions(options), {
      lazyUpdate: true,
      notMerge: false,
      ...optionUpdateBehavior,
    });
  });

  $effect(() => {
    const instance = chart;
    const events = onEvents ?? {};
    if (!instance) return;

    const wrappers: Array<[keyof ChartEvents, (...args: unknown[]) => void]> = [];

    for (const [event, handler] of Object.entries(events) as Array<
      [keyof ChartEvents, ((params: never) => void) | undefined]
    >) {
      if (typeof handler !== "function") continue;
      const wrapper = (...args: unknown[]) => handler(args[0] as never);
      wrappers.push([event, wrapper]);
      instance.on(event, wrapper);
    }

    return () => {
      for (const [event, wrapper] of wrappers) {
        instance.off(event, wrapper);
      }
    };
  });

  $effect(() => {
    const instance = chart;
    const container = element;
    if (!instance || !container) return;

    let isInitial = true;
    const observer = new ResizeObserver(() => {
      if (isInitial) {
        isInitial = false;
        return;
      }
      instance.resize();
    });

    observer.observe(container);

    return () => observer.disconnect();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  bind:this={element}
  class={cn("w-full", legacyClassName, className)}
  style:height={`${height}px`}
  tabindex={options.aria?.enabled ? 0 : undefined}
  role={options.aria?.enabled ? "img" : undefined}
></div>
