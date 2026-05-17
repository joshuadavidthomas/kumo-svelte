import type { Snippet } from "svelte";
import type { Action } from "svelte/action";

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

export interface FlowNodeRenderProps {
  action: Action<HTMLElement>;
  attrs: {
    "data-node-id": string;
    "data-node-index": number;
    "data-testid": string;
    style: string;
  };
  disabled: boolean;
  id: string;
  index: number;
}

export interface FlowAnchorRenderProps {
  action: Action<HTMLElement>;
}

export type FlowNodeRenderSnippet = Snippet<[FlowNodeRenderProps]>;
export type FlowAnchorRenderSnippet = Snippet<[FlowAnchorRenderProps]>;
