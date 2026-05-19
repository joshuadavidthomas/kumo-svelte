<script lang="ts">
  import type * as echarts from "echarts/core";
  import type { EChartsOption } from "echarts";
  import Chart from "./chart.svelte";
  import { ChartPalette } from "./color";
  import type { ChartEvents } from "./types";
  import type {
    SankeyLinkData,
    SankeyNodeData,
    SankeyTooltipParams,
  } from "./sankey-types";

  export interface SankeyChartProps {
    class?: string;
    className?: string;
    defaultNodeColor?: string;
    echarts: typeof echarts;
    formatValue?: (value: number) => string;
    height?: number;
    isDarkMode?: boolean;
    left?: number | string;
    linkColor?: "gradient" | "gray";
    linkOpacity?: number;
    links: SankeyLinkData[];
    nodePadding?: number;
    nodeWidth?: number;
    nodes: SankeyNodeData[];
    onLinkClick?: (link: SankeyLinkData) => void;
    onNodeClick?: (node: SankeyNodeData) => void;
    right?: number | string;
    showNodeValues?: boolean;
    showTooltip?: boolean;
    tooltipFormatter?: (params: SankeyTooltipParams) => string;
  }

  let {
    class: className,
    className: legacyClassName,
    defaultNodeColor,
    echarts: echartsModule,
    formatValue = defaultFormatValue,
    height = 400,
    isDarkMode = false,
    left,
    linkColor = "gradient",
    linkOpacity = 0.5,
    links,
    nodePadding = 10,
    nodeWidth = 8,
    nodes,
    onLinkClick,
    onNodeClick,
    right,
    showNodeValues,
    showTooltip = true,
    tooltipFormatter,
  }: SankeyChartProps = $props();

  let hasNodeValues = $derived(nodes.some((node) => node.value !== undefined));
  let shouldShowValues = $derived(showNodeValues ?? hasNodeValues);

  let options = $derived.by<EChartsOption>(() => {
    const labelColor = ChartPalette.text("primary", isDarkMode);
    const secondaryColor = ChartPalette.text("secondary", isDarkMode);
    const nodeDataMap = new Map(nodes.map((node) => [node.name, node]));
    const echartsNodes = nodes.map((node, index) => ({
      itemStyle: {
        color:
          node.color ??
          defaultNodeColor ??
          ChartPalette.categorical(index, isDarkMode),
      },
      name: node.name,
      value: node.value,
    }));
    const echartsLinks = links.map((link) => ({
      source: nodes[link.source]?.name ?? "",
      target: nodes[link.target]?.name ?? "",
      value: link.value,
    }));

    return {
      animation: true,
      animationDuration: 500,
      animationDurationUpdate: 300,
      animationEasingUpdate: "cubicInOut",
      backgroundColor: "transparent",
      series: [
        {
          data: echartsNodes,
          draggable: false,
          emphasis: {
            focus: "adjacency",
          },
          label: {
            color: labelColor,
            formatter: shouldShowValues
              ? (params: { name?: string }) => {
                  const name = params.name ?? "";
                  const nodeData = nodeDataMap.get(name);
                  const safeName = escapeRichText(name);
                  if (nodeData?.value !== undefined) {
                    return `{value|${escapeRichText(formatValue(nodeData.value))}}\n{name|${safeName}}`;
                  }
                  return safeName;
                }
              : undefined,
            rich: shouldShowValues
              ? {
                  name: {
                    color: labelColor,
                    fontSize: 12,
                    fontWeight: 700,
                  },
                  value: {
                    color: labelColor,
                    fontSize: 11,
                    lineHeight: 16,
                  },
                }
              : undefined,
            show: true,
          },
          lineStyle: {
            color: linkColor === "gradient" ? "source" : "#d1d5db",
            curveness: 0.5,
            opacity: linkColor === "gradient" ? linkOpacity : 0.4,
          },
          links: echartsLinks,
          ...(left !== undefined && { left }),
          ...(right !== undefined && { right }),
          nodeGap: nodePadding,
          nodeWidth,
          type: "sankey",
        },
      ],
      tooltip: showTooltip
        ? {
            dangerousHtmlFormatter: (params: unknown) => {
              if (!isTooltipParams(params)) return "";

              if (params.dataType === "node" && params.name) {
                const nodeData = nodeDataMap.get(params.name);
                const color = sanitizeColor(nodeData?.color ?? params.color ?? "#666");

                if (tooltipFormatter) {
                  return tooltipFormatter({
                    color,
                    name: params.name,
                    node: nodeData,
                    type: "node",
                  });
                }

                const safeName = escapeHtml(params.name);
                return `<div style="display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span><strong>${safeName}</strong></div>`;
              }

              if (params.dataType === "edge" && params.data) {
                const { source, target, value } = params.data;

                if (tooltipFormatter) {
                  return tooltipFormatter({
                    link: {
                      source: source ?? "",
                      target: target ?? "",
                      value: value ?? 0,
                    },
                    name: `${source} -> ${target}`,
                    type: "link",
                  });
                }

                const sourceNode = nodeDataMap.get(source ?? "");
                const targetNode = nodeDataMap.get(target ?? "");
                const sourceColor = sanitizeColor(sourceNode?.color ?? "#666");
                const targetColor = sanitizeColor(targetNode?.color ?? "#666");
                const safeSource = escapeHtml(source ?? "");
                const safeTarget = escapeHtml(target ?? "");

                return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${sourceColor}"></span>
                  <strong>${safeSource}</strong>
                  <span style="color:${secondaryColor}">-&gt;</span>
                  <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${targetColor}"></span>
                  <strong>${safeTarget}</strong>
                </div>
                <strong>${value !== undefined ? escapeHtml(formatValue(value)) : ""}</strong>`;
              }

              return "";
            },
            trigger: "item",
            triggerOn: "mousemove",
          }
        : undefined,
    };
  });

  let onEvents = $derived<Partial<ChartEvents>>({
    click: (params) => {
      if (params.dataType === "node" && onNodeClick && params.name) {
        const nodeIndex = nodes.findIndex((node) => node.name === params.name);
        const originalNode = nodeIndex >= 0 ? nodes[nodeIndex] : undefined;

        onNodeClick({
          ...originalNode,
          name: params.name,
        });
      } else if (params.dataType === "edge" && onLinkClick && params.data) {
        const data = params.data;
        const source =
          typeof data === "object" && data !== null && "source" in data
            ? String(data.source)
            : "";
        const target =
          typeof data === "object" && data !== null && "target" in data
            ? String(data.target)
            : "";
        const sourceIndex = nodes.findIndex((node) => node.name === source);
        const targetIndex = nodes.findIndex((node) => node.name === target);

        if (sourceIndex === -1 || targetIndex === -1) return;

        const rawValue = params.value;
        const value =
          typeof rawValue === "number"
            ? rawValue
            : Array.isArray(rawValue) && typeof rawValue[0] === "number"
              ? rawValue[0]
              : 0;
        const originalLink = links.find(
          (link) => link.source === sourceIndex && link.target === targetIndex,
        );

        onLinkClick({
          ...originalLink,
          source: sourceIndex,
          target: targetIndex,
          value,
        });
      }
    },
  });

  interface TooltipParams {
    color?: string;
    data?: { source?: string; target?: string; value?: number };
    dataType?: string;
    name?: string;
    value?: number | number[];
  }

  function defaultFormatValue(value: number) {
    return value.toLocaleString();
  }

  function isTooltipParams(params: unknown): params is TooltipParams {
    return typeof params === "object" && params !== null;
  }

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRichText(str: string): string {
    return str.replace(/[{}|]/g, (char) => `\\${char}`);
  }

  function sanitizeColor(color: string): string {
    const fallback = "#666";
    if (!color || typeof color !== "string") return fallback;

    if (/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)) {
      return color;
    }

    if (
      /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*[\d.]+\s*)?\)$/i.test(
        color,
      )
    ) {
      return color;
    }

    if (
      /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*[\d.]+\s*)?\)$/i.test(
        color,
      )
    ) {
      return color;
    }

    if (/^[a-z]{3,20}$/i.test(color)) {
      return color;
    }

    return fallback;
  }
</script>

<Chart
  echarts={echartsModule}
  options={options}
  className={className ?? legacyClassName}
  isDarkMode={isDarkMode}
  {height}
  onEvents={onEvents}
/>

