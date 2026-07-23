<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import type { HTMLLiAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import {
    setFlowNodeAnchorContext,
    useFlowDiagramContext,
    useFlowNodeGroup,
  } from "./context.svelte";
  import type { FlowAnchorType, FlowMeasuredNode } from "./types";

  export interface FlowNodeProps extends Omit<HTMLLiAttributes, "children" | "class"> {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    id: idProp,
    ...restProps
  }: FlowNodeProps = $props();

  const group = useFlowNodeGroup();
  const diagram = useFlowDiagramContext("Flow.Node");
  const generatedId = $props.id();

  interface NodeActionData {
    disabled: boolean;
    id: string;
  }

  let id = $derived(idProp ?? generatedId);
  let index = $derived(group.indexOf(id));
  let position = $derived(diagram.nodePositions[id]);
  let startAnchorElement: HTMLElement | null = null;
  let endAnchorElement: HTMLElement | null = null;
  let nodeElement: HTMLElement | null = null;
  let observer: ResizeObserver | undefined;
  let nodeActionData = $derived<NodeActionData>({ disabled, id });

  function measure() {
    if (!nodeElement) return;

    const nodeRect = nodeElement.getBoundingClientRect();
    const data: FlowMeasuredNode = {
      disabled,
      height: nodeRect.height,
      width: nodeRect.width,
    };

    if (startAnchorElement) {
      const rect = startAnchorElement.getBoundingClientRect();
      data.startAnchorOffset = rect.top - nodeRect.top + rect.height / 2;
    }
    if (endAnchorElement) {
      const rect = endAnchorElement.getBoundingClientRect();
      data.endAnchorOffset = rect.top - nodeRect.top + rect.height / 2;
    }

    diagram.reportNode(id, data);
  }

  function observeLayout() {
    observer?.disconnect();
    if (!nodeElement) return;

    observer = new ResizeObserver(measure);
    observer.observe(nodeElement);
    if (startAnchorElement) observer.observe(startAnchorElement);
    if (endAnchorElement && endAnchorElement !== startAnchorElement) {
      observer.observe(endAnchorElement);
    }
    measure();
  }

  const nodeAction: Action<HTMLElement, NodeActionData> = (element, data) => {
    nodeElement = element;
    let current = data;
    let registration = { kind: "node" } as const;
    let unregister = group.register(current.id, element, registration);
    observeLayout();

    return {
      update(next) {
        if (next.id !== current.id) {
          unregister();
          diagram.removeNode(current.id);
          registration = { kind: "node" };
          unregister = group.register(next.id, element, registration);
        }
        current = next;
        measure();
      },
      destroy() {
        observer?.disconnect();
        observer = undefined;
        unregister();
        diagram.removeNode(current.id);
        if (nodeElement === element) nodeElement = null;
      },
    };
  };

  setFlowNodeAnchorContext({
    registerAnchor(type: FlowAnchorType | undefined, element) {
      if (type === "start" || type === undefined) startAnchorElement = element;
      if (type === "end" || type === undefined) endAnchorElement = element;
      observeLayout();
    },
  });
</script>

<li
  use:nodeAction={nodeActionData}
  {...restProps}
  class={cn(
    "absolute rounded-md bg-kumo-base px-3 py-2 shadow ring ring-kumo-line data-[disabled]:bg-kumo-control data-[disabled]:text-kumo-placeholder",
    className,
  )}
  style:top={position ? `${position.y}px` : undefined}
  style:left={position ? `${position.x}px` : undefined}
  style:opacity={position ? undefined : 0}
  style:cursor="default"
  aria-hidden={position ? undefined : "true"}
  data-disabled={disabled ? "" : undefined}
  data-node-index={index}
  data-node-id={id}
  data-testid={id}
>
  {@render children?.()}
</li>
