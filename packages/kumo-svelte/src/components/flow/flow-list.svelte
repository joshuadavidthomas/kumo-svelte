<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { cn } from "../../utils";
  import Connectors from "./connectors.svelte";
  import {
    FlowNodeGroup,
    setFlowNodeGroupContext,
    useFlowDiagramContext,
    useOptionalFlowNodeGroup,
  } from "./context.svelte";
  import { getNodeRect, sameRect, toRectLike } from "./geometry";
  import type { FlowConnector, FlowNodeData, RectLike } from "./types";

  export interface FlowListProps {
    children?: Snippet;
    class?: string;
    id?: string;
  }

  let { children, class: className, id: idProp }: FlowListProps = $props();

  const diagram = useFlowDiagramContext("Flow.List");
  const parentGroup = useOptionalFlowNodeGroup();
  const group = new FlowNodeGroup();
  const generatedId = $props.id();

  setFlowNodeGroupContext(group);

  interface ListActionData {
    id: string;
    nodeData: FlowNodeData;
  }

  let id = $derived(idProp ?? generatedId);
  let containerRect = $state<RectLike | null>(null);
  let firstNode = $derived(group.descendants[0]);
  let lastNode = $derived(group.descendants[group.descendants.length - 1]);
  let nodeData = $derived<FlowNodeData>({
    disabled: false,
    end: firstNode?.props.end ?? null,
    parallel: false,
    start: lastNode?.props.start ?? null,
  });
  let connectors = $derived.by(computeConnectors);
  let listActionData = $derived<ListActionData>({ id, nodeData });

  function measureContainer(element: HTMLDivElement) {
    const nextRect = toRectLike(element.getBoundingClientRect());
    containerRect = sameRect(containerRect, nextRect) ? containerRect : nextRect;
  }

  function computeConnectors() {
    if (!containerRect) return [];

    const offsetX = containerRect.left;
    const offsetY = containerRect.top;
    const edges: FlowConnector[] = [];
    const nodes = group.descendants;

    for (let i = 0; i < nodes.length - 1; i += 1) {
      const currentNode = nodes[i];
      const nextNode = nodes[i + 1];

      if (currentNode.props.parallel || nextNode.props.parallel) continue;

      const currentRect = getNodeRect(currentNode, { type: "start" });
      const nextRect = getNodeRect(nextNode, { type: "end" });

      if (currentRect && nextRect) {
        edges.push({
          disabled: currentNode.props.disabled || nextNode.props.disabled,
          fromId: currentNode.id,
          single: true,
          toId: nextNode.id,
          x1: currentRect.left - offsetX + currentRect.width,
          x2: nextRect.left - offsetX,
          y1: currentRect.top - offsetY + currentRect.height / 2,
          y2: nextRect.top - offsetY + nextRect.height / 2,
        });
      }
    }

    return edges;
  }

  const containerAction: Action<HTMLDivElement, ListActionData> = (element, data) => {
    let current = data;
    let unregister = parentGroup?.register(current.id, element, current.nodeData);
    const onLayoutChange = () => measureContainer(element);

    measureContainer(element);
    const observer = new ResizeObserver(onLayoutChange);
    observer.observe(element);

    window.addEventListener("scroll", onLayoutChange, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onLayoutChange, { passive: true });

    return {
      update(next) {
        if (!parentGroup) return;
        if (next.id !== current.id) {
          unregister?.();
          unregister = parentGroup.register(next.id, element, next.nodeData);
        } else {
          parentGroup.update(next.id, next.nodeData, element);
        }
        current = next;
      },
      destroy() {
        unregister?.();
        observer.disconnect();
        window.removeEventListener("scroll", onLayoutChange, { capture: true });
        window.removeEventListener("resize", onLayoutChange);
      },
    };
  };
</script>

<div class="relative" use:containerAction={listActionData}>
  <ul
    class={cn(
      "ml-0 list-none",
      diagram.orientation === "vertical" ? "grid auto-rows-min gap-16" : "flex gap-16",
      diagram.orientation === "horizontal" &&
        (diagram.align === "center" ? "items-center" : "items-start"),
      className,
    )}
  >
    {@render children?.()}
  </ul>
  <div class="pointer-events-none absolute inset-0">
    <Connectors {connectors} orientation={diagram.orientation} />
  </div>
</div>
