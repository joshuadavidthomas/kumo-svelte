import { getContext, setContext, untrack } from "svelte";
import type {
  FlowAlign,
  FlowAnchorType,
  FlowEdges,
  FlowMeasuredNode,
  FlowNodePositions,
  FlowOrientation,
  FlowParallelAlign,
} from "./types";

export type FlowGroupNodeData =
  | { kind: "node" }
  | { align?: FlowParallelAlign; group: FlowNodeGroup; kind: "parallel" }
  | { group: FlowNodeGroup; kind: "list" };

export interface DescendantInfo<T = FlowGroupNodeData> {
  element: HTMLElement;
  id: string;
  props: T;
}

export class FlowNodeGroup<T = FlowGroupNodeData> {
  descendants = $state.raw<DescendantInfo<T>[]>([]);

  #nodes = new Map<string, DescendantInfo<T>>();

  register(id: string, element: HTMLElement, props: T) {
    const current = this.#nodes.get(id);
    if (!current || current.element !== element || current.props !== props) {
      this.#nodes.set(id, { element, id, props });
      this.#sort();
    }

    return () => {
      if (this.#nodes.get(id)?.element !== element) return;
      this.#nodes.delete(id);
      this.#sort();
    };
  }

  update(id: string, props: T, element?: HTMLElement | null) {
    const current = this.#nodes.get(id);
    if (!current) return;

    const nextElement = element ?? current.element;
    if (current.element === nextElement && current.props === props) return;

    this.#nodes.set(id, {
      element: nextElement,
      id,
      props,
    });
    this.#sort();
  }

  resort() {
    this.#sort();
  }

  indexOf(id: string) {
    return this.descendants.findIndex((descendant) => descendant.id === id);
  }

  previous(id: string) {
    const index = this.indexOf(id);
    if (index <= 0) return undefined;
    return this.descendants[index - 1];
  }

  next(id: string) {
    const index = this.indexOf(id);
    if (index < 0 || index >= this.descendants.length - 1) return undefined;
    return this.descendants[index + 1];
  }

  #sort() {
    const nextDescendants = Array.from(this.#nodes.values()).sort((a, b) => {
      if (a.element === b.element) return 0;
      const position = a.element.compareDocumentPosition(b.element);
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    if (untrack(() => sameDescendants(this.descendants, nextDescendants))) return;
    this.descendants = nextDescendants;
  }
}

export function observeFlowNodeGroup(element: HTMLUListElement, group: FlowNodeGroup) {
  const observer = new MutationObserver(() => group.resort());
  observer.observe(element, { childList: true });

  return {
    destroy() {
      observer.disconnect();
    },
  };
}

function sameDescendants<T>(left: DescendantInfo<T>[], right: DescendantInfo<T>[]) {
  return (
    left.length === right.length &&
    left.every((descendant, index) => {
      const next = right[index];
      return (
        next &&
        descendant.id === next.id &&
        descendant.element === next.element &&
        descendant.props === next.props
      );
    })
  );
}

export interface FlowDiagramContextValue {
  align: FlowAlign;
  edges: FlowEdges;
  nodePositions: FlowNodePositions;
  nodes: Record<string, FlowMeasuredNode>;
  orientation: FlowOrientation;
  removeNode: (id: string) => void;
  reportNode: (id: string, node: FlowMeasuredNode) => void;
}

export interface FlowNodeAnchorContextValue {
  registerAnchor: (type: FlowAnchorType | undefined, element: HTMLElement | null) => void;
}

const FLOW_DIAGRAM_CONTEXT = Symbol("kumo.flow.diagram");
const FLOW_NODE_GROUP_CONTEXT = Symbol("kumo.flow.node-group");
const FLOW_NODE_ANCHOR_CONTEXT = Symbol("kumo.flow.node-anchor");

export function setFlowDiagramContext(value: FlowDiagramContextValue) {
  setContext(FLOW_DIAGRAM_CONTEXT, value);
}

export function useFlowDiagramContext(component = "Flow") {
  const context = getContext<FlowDiagramContextValue | undefined>(FLOW_DIAGRAM_CONTEXT);
  if (!context) {
    throw new Error(`${component} must be used within Flow.`);
  }
  return context;
}

export function setFlowNodeGroupContext(group: FlowNodeGroup) {
  setContext(FLOW_NODE_GROUP_CONTEXT, group);
}

export function useFlowNodeGroup(component = "Flow.Node") {
  const context = getContext<FlowNodeGroup | undefined>(FLOW_NODE_GROUP_CONTEXT);
  if (!context) {
    throw new Error(`${component} must be used within Flow.List.`);
  }
  return context;
}

export function useOptionalFlowNodeGroup() {
  return getContext<FlowNodeGroup | undefined>(FLOW_NODE_GROUP_CONTEXT);
}

export function setFlowNodeAnchorContext(value: FlowNodeAnchorContextValue) {
  setContext(FLOW_NODE_ANCHOR_CONTEXT, value);
}

export function useFlowNodeAnchorContext() {
  const context = getContext<FlowNodeAnchorContextValue | undefined>(FLOW_NODE_ANCHOR_CONTEXT);
  if (!context) {
    throw new Error("Flow.Anchor must be used within Flow.Node");
  }
  return context;
}
