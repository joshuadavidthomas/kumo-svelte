import type { ComponentProps } from "svelte";
import ConnectorsComponent from "./connectors.svelte";
import FlowComponent from "./flow.svelte";
import FlowAnchorComponent from "./flow-anchor.svelte";
import FlowListComponent from "./flow-list.svelte";
import FlowNodeComponent from "./flow-node.svelte";
import FlowParallelComponent from "./flow-parallel.svelte";

const Flow = Object.assign(FlowComponent, {
  Root: FlowComponent,
  Anchor: FlowAnchorComponent,
  Connectors: ConnectorsComponent,
  List: FlowListComponent,
  Node: FlowNodeComponent,
  Parallel: FlowParallelComponent,
});

export {
  Flow,
  FlowComponent as FlowRoot,
  FlowComponent as Root,
  FlowAnchorComponent as FlowAnchor,
  FlowAnchorComponent as Anchor,
  ConnectorsComponent as FlowConnectors,
  ConnectorsComponent as Connectors,
  FlowListComponent as FlowList,
  FlowListComponent as List,
  FlowNodeComponent as FlowNode,
  FlowNodeComponent as Node,
  FlowParallelComponent as FlowParallel,
  FlowParallelComponent as Parallel,
};
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
