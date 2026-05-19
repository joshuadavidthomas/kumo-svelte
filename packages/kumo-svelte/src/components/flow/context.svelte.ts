import { getContext, setContext, untrack } from "svelte";
import type { FlowAlign, FlowNodeData, FlowOrientation } from "./types";

export interface DescendantInfo<T> {
  element: HTMLElement;
  id: string;
  props: T;
}

export class FlowNodeGroup<T extends FlowNodeData = FlowNodeData> {
  descendants = $state.raw<DescendantInfo<T>[]>([]);
  measurementEpoch = $state(0);

  #nodes = new Map<string, DescendantInfo<T>>();

  register(id: string, element: HTMLElement, props: T) {
    const current = this.#nodes.get(id);
    if (!current || current.element !== element || !sameFlowNodeProps(current.props, props)) {
      this.#nodes.set(id, { element, id, props });
      this.#sort();
      this.#bumpMeasurementEpoch();
    }

    return () => {
      if (this.#nodes.get(id)?.element !== element) return;
      this.#nodes.delete(id);
      this.#sort();
      this.#bumpMeasurementEpoch();
    };
  }

  update(id: string, props: T, element?: HTMLElement | null) {
    const current = this.#nodes.get(id);
    if (!current) return;

    const nextElement = element ?? current.element;
    if (current.element === nextElement && sameFlowNodeProps(current.props, props)) return;

    this.#nodes.set(id, {
      element: nextElement,
      id,
      props,
    });
    this.#sort();
  }

  notifySizeChange() {
    this.#bumpMeasurementEpoch();
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

  #bumpMeasurementEpoch() {
    this.measurementEpoch = untrack(() => this.measurementEpoch) + 1;
  }
}

function sameFlowNodeProps<T extends FlowNodeData>(left: T, right: T) {
  return (
    left.disabled === right.disabled &&
    left.parallel === right.parallel &&
    sameFlowRect(left.start, right.start) &&
    sameFlowRect(left.end, right.end)
  );
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
        sameFlowNodeProps(descendant.props as FlowNodeData, next.props as FlowNodeData)
      );
    })
  );
}

function sameFlowRect(left: FlowNodeData["start"], right: FlowNodeData["start"]) {
  if (left === right) return true;
  if (!left || !right) return false;
  return (
    left.x === right.x &&
    left.y === right.y &&
    left.top === right.top &&
    left.right === right.right &&
    left.bottom === right.bottom &&
    left.left === right.left &&
    left.width === right.width &&
    left.height === right.height
  );
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
