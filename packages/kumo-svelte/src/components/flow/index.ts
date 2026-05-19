import type { ComponentProps } from "svelte";
import ConnectorsComponent from "./connectors.svelte";
import FlowComponent from "./flow.svelte";
import FlowAnchorComponent from "./flow-anchor.svelte";
import FlowListComponent from "./flow-list.svelte";
import FlowNodeComponent from "./flow-node.svelte";
import FlowParallelComponent from "./flow-parallel.svelte";

export { default as Flow } from "./flow.svelte";
export { default as FlowRoot } from "./flow.svelte";
export { default as FlowAnchor } from "./flow-anchor.svelte";
export { default as FlowConnectors } from "./connectors.svelte";
export { default as FlowList } from "./flow-list.svelte";
export { default as FlowNode } from "./flow-node.svelte";
export { default as FlowParallel } from "./flow-parallel.svelte";
export { createRoundedPath, type FlowPathOptions } from "./paths";

export type FlowProps = ComponentProps<typeof FlowComponent>;
export type FlowRootProps = FlowProps;
export type FlowAnchorProps = ComponentProps<typeof FlowAnchorComponent>;
export type FlowConnectorsProps = ComponentProps<typeof ConnectorsComponent>;
export type FlowListProps = ComponentProps<typeof FlowListComponent>;
export type FlowNodeProps = ComponentProps<typeof FlowNodeComponent>;
export type FlowParallelProps = ComponentProps<typeof FlowParallelComponent>;

export type {
  FlowAlign,
  FlowAnchorRenderProps,
  FlowAnchorRenderSnippet,
  FlowAnchorType,
  FlowConnector,
  FlowNodeData,
  FlowNodeRenderProps,
  FlowNodeRenderSnippet,
  FlowOrientation,
  FlowParallelAlign,
  RectLike,
} from "./types";
