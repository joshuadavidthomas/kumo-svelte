import { getContext, setContext } from "svelte";
import type { FlowAlign, FlowNodeData, FlowOrientation } from "./types";

export interface DescendantInfo<T> {
  element: HTMLElement;
  id: string;
  props: T;
}

export class FlowNodeGroup<T extends FlowNodeData = FlowNodeData> {
  descendants = $state<DescendantInfo<T>[]>([]);
  measurementEpoch = $state(0);

  #nodes = new Map<string, DescendantInfo<T>>();

  register(id: string, element: HTMLElement, props: T) {
    this.#nodes.set(id, { element, id, props });
    this.#sort();
    this.measurementEpoch += 1;

    return () => {
      if (this.#nodes.get(id)?.element !== element) return;
      this.#nodes.delete(id);
      this.#sort();
      this.measurementEpoch += 1;
    };
  }

  update(id: string, props: T, element?: HTMLElement | null) {
    const current = this.#nodes.get(id);
    if (!current) return;

    this.#nodes.set(id, {
      element: element ?? current.element,
      id,
      props,
    });
    this.#sort();
  }

  notifySizeChange() {
    this.measurementEpoch += 1;
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
    this.descendants = Array.from(this.#nodes.values()).sort((a, b) => {
      if (a.element === b.element) return 0;
      const position = a.element.compareDocumentPosition(b.element);
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  }
}

export interface FlowDiagramContextValue {
  align: FlowAlign;
  orientation: FlowOrientation;
  wrapper: HTMLElement | null;
  x: number;
  y: number;
}

export interface FlowNodeAnchorContextValue {
  registerEndAnchor: (element: HTMLElement | null) => void;
  registerStartAnchor: (element: HTMLElement | null) => void;
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
