<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { cn } from "../../utils";
  import Connectors from "./connectors.svelte";
  import {
    FlowNodeGroup,
    setFlowNodeGroupContext,
    useFlowDiagramContext,
    useOptionalFlowNodeGroup,
  } from "./context.svelte";
  import { getNodeRect } from "./geometry";
  import type { FlowConnector, FlowNodeData } from "./types";

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

  let id = $derived(idProp ?? generatedId);
  let containerElement = $state<HTMLDivElement | null>(null);
  let connectors = $state<FlowConnector[]>([]);
  let firstNode = $derived(group.descendants[0]);
  let lastNode = $derived(group.descendants[group.descendants.length - 1]);
  let nodeData = $derived<FlowNodeData>({
    disabled: false,
    end: firstNode?.props.end ?? null,
    parallel: false,
    start: lastNode?.props.start ?? null,
  });

  const containerAction: Action<HTMLDivElement> = (element) => {
    containerElement = element;
    return {
      destroy() {
        if (containerElement === element) containerElement = null;
      },
    };
  };

  function computeConnectors() {
    const containerRect = containerElement?.getBoundingClientRect();
    const offsetX = containerRect?.left ?? 0;
    const offsetY = containerRect?.top ?? 0;
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

    connectors = edges;
  }

  async function computeConnectorsAfterTick(..._deps: unknown[]) {
    await tick();
    computeConnectors();
  }

  $effect(() => {
    const element = containerElement;
    const currentId = id;
    if (!parentGroup || !element) return;

    return parentGroup.register(currentId, element, { parallel: false });
  });

  $effect(() => {
    const element = containerElement;
    if (!parentGroup || !element) return;
    parentGroup.update(id, nodeData, element);
  });

  $effect(() => {
    void computeConnectorsAfterTick(group.measurementEpoch, group.descendants);
  });

  $effect(() => {
    window.addEventListener("scroll", computeConnectors, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", computeConnectors, { passive: true });

    return () => {
      window.removeEventListener("scroll", computeConnectors, { capture: true });
      window.removeEventListener("resize", computeConnectors);
    };
  });
</script>

<div class="relative" use:containerAction>
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
