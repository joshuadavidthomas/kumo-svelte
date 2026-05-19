export interface SankeyNodeData {
  childCount?: number;
  color?: string;
  id?: string;
  isDrillable?: boolean;
  name: string;
  tooltipData?: Record<string, number | string>;
  value?: number;
}

export interface SankeyLinkData {
  id?: string;
  isDrillable?: boolean;
  source: number;
  target: number;
  value: number;
}

export type DrillTarget =
  | { nodeId: string; type: "node" }
  | { sourceId: string; targetId: string; type: "link" };

export interface DrillSelection {
  depth: number;
  id: string;
  label: string;
  type: "link" | "node";
}

export interface DrillDownContext {
  isMultiSelect: boolean;
  selections: DrillSelection[];
}

export interface SankeyData {
  links: SankeyLinkData[];
  nodes: SankeyNodeData[];
}

export interface SankeyTooltipParams {
  color?: string;
  link?: { source: string; target: string; value: number };
  name: string;
  node?: SankeyNodeData;
  type: "link" | "node";
}
