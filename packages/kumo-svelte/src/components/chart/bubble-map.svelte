<script lang="ts" generics="T">
  import type * as echarts from "echarts/core";
  import Chart from "./chart.svelte";
  import { ChartPalette } from "./color";
  import type { ChartEvents, KumoChartOption } from "./types";
  import type { BubbleMapProps, BubblePoint, MapAccessor, MapGeoJson, MapStyle } from "./map-types";

  const MAX_ZOOM_FACTOR = 8;
  const geoJsonMapNames = new WeakMap<MapGeoJson, string>();

  let {
    class: className,
    echarts: echartsModule,
    geoJson,
    mapName: mapNameProp,
    data,
    lng,
    lat,
    value,
    name,
    minRadius = 6,
    maxRadius = 26,
    bubbleSize,
    bubbleColor,
    bubbleBorderColor = "transparent",
    bubbleBorderWidth = 0,
    center,
    zoom = 1.25,
    roam = true,
    showTooltip = true,
    valueFormat = defaultValueFormat,
    tooltipFormatter,
    onBubbleHover,
    onBubbleClick,
    height = 400,
    isDarkMode = false,
    ref = $bindable(null),
  }: BubbleMapProps<T> = $props();

  let registeredMapName = $state<string | null>(null);
  let registeredGeoJson = $state.raw<MapGeoJson | null>(null);
  let registeredEcharts = $state.raw<typeof echartsModule | null>(null);

  let mapName = $derived(getMapName(geoJson, mapNameProp));
  let isMapRegistered = $derived(
    registeredMapName === mapName &&
      registeredGeoJson === geoJson &&
      registeredEcharts === echartsModule,
  );

  let options = $derived.by<KumoChartOption>(() => {
    const palette = ChartPalette.mapColors(isDarkMode);
    const values = data.map((row) => resolve(row, value));
    const vmin = values.length ? Math.min(...values) : 0;
    const vmax = values.length ? Math.max(...values) : 1;

    const radiusFor = (pointValue: number) => {
      if (bubbleSize) return bubbleSize(pointValue);
      if (vmax <= vmin) return maxRadius;
      const t = Math.sqrt((pointValue - vmin) / (vmax - vmin));
      return minRadius + t * (maxRadius - minRadius);
    };

    const points: BubblePoint<T>[] = data.map((row) => {
      const pointValue = resolve(row, value);

      return {
        name: name ? resolve(row, name) : undefined,
        value: [resolve(row, lng), resolve(row, lat), pointValue],
        symbolSize: radiusFor(pointValue),
        itemStyle: {
          color: bubbleColor ? resolveStyle(row, bubbleColor) : palette.bubble,
          borderColor: resolveStyle(row, bubbleBorderColor),
          borderWidth: resolveStyle(row, bubbleBorderWidth),
        },
        datum: row,
      };
    });

    return {
      animation: true,
      animationDuration: 500,
      backgroundColor: "transparent",
      geo: buildGeo({
        areaColor: palette.area,
        center,
        mapName,
        roam,
        zoom,
      }),
      series: [
        {
          coordinateSystem: "geo",
          data: points,
          emphasis: { itemStyle: { opacity: 1 }, scale: 1.2 },
          itemStyle: { opacity: 0.8 },
          type: "scatter",
          z: 3,
        },
      ],
      tooltip: showTooltip
        ? {
            backgroundColor: "var(--color-kumo-base)",
            borderColor: "var(--color-kumo-line)",
            borderWidth: 1,
            dangerousHtmlFormatter: (params: unknown) => {
              const point = params as {
                name?: string;
                value?: number[];
                data?: { datum?: T };
              };
              const row = point.data?.datum;

              if (tooltipFormatter && row !== undefined) return tooltipFormatter(row);

              const pointName = point.name
                ? `<strong>${escapeHtml(point.name)}</strong>`
                : "";
              const pointValue = point.value?.[2];
              const valueText =
                pointValue !== undefined
                  ? `<span style="color:var(--text-color-kumo-subtle)">${escapeHtml(valueFormat(pointValue))}</span>`
                  : "";

              return `<div style="display:flex;flex-direction:column;gap:2px;">${pointName}${valueText}</div>`;
            },
            extraCssText: "border-radius: 0.5rem;",
            padding: 8,
            textStyle: {
              color: "var(--text-color-kumo-default)",
              fontSize: 13,
            },
            trigger: "item",
            triggerOn: "mousemove",
          }
        : undefined,
    };
  });

  let onEvents = $derived<Partial<ChartEvents>>({
    ...(onBubbleHover
      ? {
          globalout: () => onBubbleHover?.(undefined),
          mouseout: () => onBubbleHover?.(undefined),
          mouseover: (params) => {
            const datum = (params.data as { datum?: T } | undefined)?.datum;
            if (datum !== undefined) onBubbleHover?.(datum);
          },
        }
      : {}),
    ...(onBubbleClick
      ? {
          click: (params) => {
            const datum = (params.data as { datum?: T } | undefined)?.datum;
            if (datum !== undefined) onBubbleClick?.(datum);
          },
        }
      : {}),
  });

  $effect(() => {
    echartsModule.registerMap(mapName, geoJson as Parameters<typeof echartsModule.registerMap>[1]);
    registeredMapName = mapName;
    registeredGeoJson = geoJson;
    registeredEcharts = echartsModule;
  });

  function resolve<TValue>(row: T, accessor: MapAccessor<T, TValue>): TValue {
    return typeof accessor === "function" ? accessor(row) : (row[accessor] as TValue);
  }

  function resolveStyle<TValue>(row: T, style: MapStyle<T, TValue>): TValue {
    return typeof style === "function" ? (style as (value: T) => TValue)(row) : style;
  }

  function buildGeo(opts: {
    areaColor: string;
    center?: [number, number];
    mapName: string;
    roam: boolean;
    zoom: number;
  }) {
    return {
      aspectScale: 1,
      center: opts.center,
      emphasis: { disabled: true },
      itemStyle: {
        areaColor: opts.areaColor,
        borderColor: opts.areaColor,
        borderWidth: 0.5,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "180%",
      map: opts.mapName,
      nameProperty: "name",
      roam: opts.roam,
      scaleLimit: opts.roam
        ? {
            max: opts.zoom * MAX_ZOOM_FACTOR,
            min: Math.min(1, opts.zoom),
          }
        : undefined,
      silent: true,
      zoom: opts.zoom,
    };
  }

  function sanitizeMapName(name: string) {
    return name.replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  function hashString(value: string) {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      hash = Math.imul(31, hash) + value.charCodeAt(i);
    }

    return (hash >>> 0).toString(36);
  }

  function getMapName(mapGeoJson: MapGeoJson, explicitMapName?: string) {
    if (explicitMapName) return sanitizeMapName(explicitMapName);

    const existing = geoJsonMapNames.get(mapGeoJson);
    if (existing) return existing;

    const generated = `kumo-map-${hashString(JSON.stringify(mapGeoJson))}`;
    geoJsonMapNames.set(mapGeoJson, generated);
    return generated;
  }

  function defaultValueFormat(value: number) {
    return value.toLocaleString();
  }

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
</script>

{#if isMapRegistered}
  <Chart
    bind:ref
    class={className}
    {height}
    isDarkMode={isDarkMode}
    onEvents={onEvents}
    {options}
    echarts={echartsModule}
  />
{/if}
