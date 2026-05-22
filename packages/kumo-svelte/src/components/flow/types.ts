export type FlowOrientation = "horizontal" | "vertical";
export type FlowAlign = "start" | "center";
export type FlowParallelAlign = "start" | "end";
export type FlowAnchorType = "start" | "end";

export interface RectLike {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface FlowNodeData {
  disabled?: boolean;
  end?: RectLike | null;
  parallel?: boolean;
  start?: RectLike | null;
}

export interface FlowConnector {
  disabled?: boolean;
  fromId?: string;
  isBottom?: boolean;
  single?: boolean;
  toId?: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
