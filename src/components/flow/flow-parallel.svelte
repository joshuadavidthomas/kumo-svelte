<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { cn } from "../../utils";
  import Connectors from "./connectors.svelte";
  import {
    FlowNodeGroup,
    setFlowNodeGroupContext,
    useFlowDiagramContext,
    useFlowNodeGroup,
  } from "./context.svelte";
  import { getNodeRect, sameRect, toRectLike } from "./geometry";
  import type {
    FlowConnector,
    FlowNodeData,
    FlowParallelAlign,
    RectLike,
  } from "./types";

  export interface FlowParallelProps {
    align?: FlowParallelAlign;
    children: Snippet;
    id?: string;
  }

  interface LinksResult {
    connectors: FlowConnector[];
    junctions: {
      end?: { x: number; y: number };
      start?: { x: number; y: number };
    };
  }

  let { align = "start", children, id: idProp }: FlowParallelProps = $props();

  const diagram = useFlowDiagramContext("Flow.Parallel");
  const parentGroup = useFlowNodeGroup("Flow.Parallel");
  const childGroup = new FlowNodeGroup();
  const generatedId = $props.id();

  setFlowNodeGroupContext(childGroup);

  let id = $derived(idProp ?? generatedId);
  let index = $derived(parentGroup.indexOf(id));
  let containerElement = $state<HTMLDivElement | null>(null);
  let contentElement = $state<HTMLUListElement | null>(null);
  let measurements = $state<RectLike | null>(null);
  let links = $state<LinksResult | null>(null);
  let firstBranch = $derived(childGroup.descendants[0]);
  let endAnchor = $derived(firstBranch?.props.end ?? measurements);
  let startAnchor = $derived(firstBranch?.props.start ?? measurements);
  let nodeData = $derived<FlowNodeData>({
    end: endAnchor,
    parallel: true,
    start: startAnchor,
  });
  let previousIsParallel = $derived(parentGroup.previous(id)?.props.parallel === true);

  const containerAction: Action<HTMLDivElement> = (element) => {
    containerElement = element;
    return {
      destroy() {
        if (containerElement === element) containerElement = null;
      },
    };
  };

  const contentAction: Action<HTMLUListElement> = (element) => {
    contentElement = element;
    return {
      destroy() {
        if (contentElement === element) contentElement = null;
      },
    };
  };

  function measure() {
    if (!contentElement) return;
    const rect = toRectLike(contentElement.getBoundingClientRect());
    measurements = sameRect(measurements, rect) ? measurements : rect;
  }

  function getStartAndEndPoints({
    container,
    next,
    previous,
  }: {
    container: RectLike;
    next: RectLike | null;
    previous: RectLike | null;
  }) {
    if (diagram.orientation === "vertical") {
      return {
        end: { x: container.width / 2, y: container.height },
        start: { x: container.width / 2, y: 0 },
      };
    }

    const start = {
      x: 0,
      y: container.height / 2,
    };
    const end = {
      x: container.width,
      y: container.height / 2,
    };

    if (previous) {
      start.y = previous.top - container.top + previous.height / 2;
    }
    if (next) {
      end.y = next.top - container.top + next.height / 2;
    }

    return { end, start };
  }

  function computeLinks() {
    if (!containerElement) return;

    const containerRect = toRectLike(containerElement.getBoundingClientRect());
    const previousNode = parentGroup.previous(id);
    const nextNode = parentGroup.next(id);
    const previousNodeRect = getNodeRect(previousNode, { type: "start" });
    const nextNodeRect = getNodeRect(nextNode, { type: "end" });
    const { end, start } = getStartAndEndPoints({
      container: containerRect,
      next: nextNodeRect,
      previous: previousNodeRect,
    });

    const incomingBranchPoints: { y: number }[] = [];
    const outgoingBranchPoints: { y: number }[] = [];

    for (const descendant of childGroup.descendants) {
      const { end: endAnchorRect, start: startAnchorRect } = descendant.props;

      if (previousNodeRect && endAnchorRect) {
        incomingBranchPoints.push({
          y:
            diagram.orientation === "horizontal"
              ? endAnchorRect.top - containerRect.top + endAnchorRect.height / 2
              : endAnchorRect.left - containerRect.left + endAnchorRect.width / 2,
        });
      }

      if (nextNodeRect && startAnchorRect) {
        outgoingBranchPoints.push({
          y:
            diagram.orientation === "horizontal"
              ? startAnchorRect.top - containerRect.top + startAnchorRect.height / 2
              : startAnchorRect.left -
                containerRect.left +
                startAnchorRect.width / 2,
        });
      }
    }

    const flatThreshold = 2;
    const hasIncomingJunction = (() => {
      if (incomingBranchPoints.length <= 1) return false;
      const hasAbove = incomingBranchPoints.some((point) => point.y < start.y - flatThreshold);
      const hasBelow = incomingBranchPoints.some((point) => point.y > start.y + flatThreshold);
      const hasInline = incomingBranchPoints.some(
        (point) => Math.abs(point.y - start.y) <= flatThreshold,
      );
      return [hasAbove, hasBelow, hasInline].filter(Boolean).length > 1;
    })();

    const hasOutgoingJunction = (() => {
      if (outgoingBranchPoints.length <= 1) return false;
      const hasAbove = outgoingBranchPoints.some((point) => point.y < end.y - flatThreshold);
      const hasBelow = outgoingBranchPoints.some((point) => point.y > end.y + flatThreshold);
      const hasInline = outgoingBranchPoints.some(
        (point) => Math.abs(point.y - end.y) <= flatThreshold,
      );
      return [hasAbove, hasBelow, hasInline].filter(Boolean).length > 1;
    })();

    const connectors = childGroup.descendants.flatMap((descendant) => {
      const { end: endAnchorRect, start: startAnchorRect } = descendant.props;
      const nextConnectors: FlowConnector[] = [];
      const isDescendantDisabled = descendant.props.disabled;

      if (previousNodeRect && endAnchorRect) {
        const branchStart =
          diagram.orientation === "vertical"
            ? {
                x:
                  endAnchorRect.left -
                  containerRect.left +
                  endAnchorRect.width / 2,
                y: endAnchorRect.top - containerRect.top,
              }
            : {
                x: endAnchorRect.left - containerRect.left,
                y:
                  endAnchorRect.top -
                  containerRect.top +
                  endAnchorRect.height / 2,
              };

        nextConnectors.push({
          disabled: previousNode?.props.disabled || isDescendantDisabled,
          fromId: previousNode?.id,
          isBottom: false,
          single: !hasIncomingJunction,
          toId: descendant.id,
          x1: start.x,
          x2: branchStart.x,
          y1: start.y,
          y2: branchStart.y,
        });
      }

      if (nextNodeRect && startAnchorRect) {
        const branchEnd =
          diagram.orientation === "vertical"
            ? {
                x:
                  startAnchorRect.left -
                  containerRect.left +
                  startAnchorRect.width / 2,
                y: startAnchorRect.bottom - containerRect.top,
              }
            : {
                x: startAnchorRect.right - containerRect.left,
                y:
                  startAnchorRect.top -
                  containerRect.top +
                  startAnchorRect.height / 2,
              };

        nextConnectors.push({
          disabled: isDescendantDisabled || nextNode?.props.disabled,
          fromId: descendant.id,
          isBottom: true,
          single: !hasOutgoingJunction,
          toId: nextNode?.id,
          x1: branchEnd.x,
          x2: end.x,
          y1: branchEnd.y,
          y2: end.y,
        });
      }

      return nextConnectors;
    });

    links = {
      connectors,
      junctions: {
        end:
          nextNodeRect && hasOutgoingJunction
            ? {
                x: diagram.orientation === "vertical" ? end.x : end.x - 32,
                y: diagram.orientation === "vertical" ? end.y - 32 : end.y,
              }
            : undefined,
        start:
          previousNodeRect && hasIncomingJunction
            ? {
                x: diagram.orientation === "vertical" ? start.x : start.x + 32,
                y: diagram.orientation === "vertical" ? start.y + 32 : start.y,
              }
            : undefined,
      },
    };
  }

  async function computeLinksAfterTick(..._deps: unknown[]) {
    await tick();
    computeLinks();
  }

  $effect(() => {
    const element = containerElement;
    const currentId = id;
    if (!element) return;

    return parentGroup.register(currentId, element, { parallel: true });
  });

  $effect(() => {
    const element = containerElement;
    if (!element) return;
    parentGroup.update(id, nodeData, element);
  });

  $effect(() => {
    const element = contentElement;
    if (!element) return;

    const onLayoutChange = () => {
      measure();
      parentGroup.notifySizeChange();
    };

    measure();
    const observer = new ResizeObserver(onLayoutChange);
    observer.observe(element);

    window.addEventListener("scroll", onLayoutChange, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onLayoutChange, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onLayoutChange, { capture: true });
      window.removeEventListener("resize", onLayoutChange);
    };
  });

  $effect(() => {
    void computeLinksAfterTick(
      childGroup.measurementEpoch,
      parentGroup.measurementEpoch,
      childGroup.descendants,
      parentGroup.descendants,
    );
  });
</script>

<div
  use:containerAction
  class={cn(
    "relative isolate",
    diagram.orientation === "horizontal" ? "-mr-16 px-16" : "-mb-16 py-16",
    diagram.orientation === "horizontal"
      ? previousIsParallel
        ? "-ml-3"
        : "-ml-16"
      : previousIsParallel
        ? "-mt-3"
        : "-mt-16",
  )}
  data-node-index={index}
>
  <div class="pointer-events-none absolute inset-0 z-1">
    {#if links}
      <Connectors connectors={links.connectors} orientation={diagram.orientation}>
        {#if links?.junctions.start}
          <g transform={`translate(${links.junctions.start.x} ${links.junctions.start.y})`}>
            <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
          </g>
        {/if}
        {#if links?.junctions.end}
          <g transform={`translate(${links.junctions.end.x} ${links.junctions.end.y})`}>
            <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
          </g>
        {/if}
      </Connectors>
    {/if}
  </div>
  <ul
    use:contentAction
    class={cn(
      "flex list-none gap-5",
      align === "start" ? "items-start" : "items-end",
      diagram.orientation === "horizontal" ? "ml-0 flex-col" : "mx-auto w-fit",
    )}
  >
    {@render children()}
  </ul>
</div>
