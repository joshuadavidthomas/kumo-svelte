<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import Connectors from "./connectors.svelte";
  import {
    FlowNodeGroup,
    observeFlowNodeGroup,
    setFlowDiagramContext,
    setFlowNodeGroupContext,
    type FlowGroupNodeData,
  } from "./context.svelte";
  import {
    computeConnectors,
    computeDiagramRect,
    computeEdges,
    computePositions,
  } from "./geometry";
  import type {
    FlowAlign,
    FlowMeasuredNode,
    FlowOrientation,
    FlowState,
    FlowTreeNode,
  } from "./types";

  const DEFAULT_PADDING = {
    x: 16,
    y: 64,
  };
  const MIN_SCROLLBAR_THUMB_SIZE = 10;

  export interface FlowProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    align?: FlowAlign;
    canvas?: boolean;
    children?: Snippet;
    class?: string;
    onOverflowChange?: (overflow: { x: boolean; y: boolean }) => void;
    orientation?: FlowOrientation;
    padding?: { x?: number; y?: number };
  }

  let {
    align = "start",
    canvas = true,
    children,
    class: className,
    onOverflowChange,
    orientation = "horizontal",
    padding: requestedPadding,
    ...restProps
  }: FlowProps = $props();

  const rootGroup = new FlowNodeGroup();

  let wrapperElement: HTMLDivElement | null = null;
  let contentElement: HTMLDivElement | null = null;
  let cleanupCanvasObserver: (() => void) | undefined;
  let nodes = $state.raw<Record<string, FlowMeasuredNode>>({});
  let x = $state(0);
  let y = $state(0);
  let bounds = $state<{ x: number; y: number } | null>(null);
  let dimensions = $state<{
    contentHeight: number;
    contentWidth: number;
    viewportHeight: number;
    viewportWidth: number;
  } | null>(null);
  let isPanning = $state(false);
  let canPan = $state(false);
  let stopPanning: (() => void) | undefined;

  let padding = $derived({
    x: requestedPadding?.x ?? DEFAULT_PADDING.x,
    y: requestedPadding?.y ?? DEFAULT_PADDING.y,
  });
  let canScrollX = $derived(Boolean(bounds && bounds.x < 0));
  let canScrollY = $derived(Boolean(bounds && bounds.y < 0));
  let scrollThumbWidth = $derived(
    dimensions && dimensions.contentWidth > 0 && dimensions.viewportWidth > 0
      ? Math.max(
          MIN_SCROLLBAR_THUMB_SIZE,
          (dimensions.viewportWidth / dimensions.contentWidth) * 100,
        )
      : 0,
  );
  let scrollThumbHeight = $derived(
    dimensions && dimensions.contentHeight > 0 && dimensions.viewportHeight > 0
      ? Math.max(
          MIN_SCROLLBAR_THUMB_SIZE,
          (dimensions.viewportHeight / dimensions.contentHeight) * 100,
        )
      : 0,
  );
  let scrollLeft = $derived(
    bounds && bounds.x < 0
      ? `${(x / bounds.x) * (100 - scrollThumbWidth)}%`
      : "0%",
  );
  let scrollTop = $derived(
    bounds && bounds.y < 0
      ? `${(y / bounds.y) * (100 - scrollThumbHeight)}%`
      : "0%",
  );
  let contentStyle = $derived(`transform: translate3d(${x}px, ${y}px, 0);`);
  let canvasActionData = $derived({ padding });
  let tree = $derived(groupToTree(rootGroup));
  let flowState = $derived<FlowState>({ align, nodes, orientation, tree });
  let edges = $derived(computeEdges(flowState));
  let nodePositions = $derived(computePositions(flowState));
  let diagramRect = $derived(computeDiagramRect(nodePositions, flowState));
  let connectors = $derived(computeConnectors(edges, nodePositions, nodes, orientation));

  function groupToTree(
    group: FlowNodeGroup,
  ): Extract<FlowTreeNode, { kind: "list" }> {
    return {
      kind: "list",
      children: group.descendants.map(({ id, props }: { id: string; props: FlowGroupNodeData }) => {
        if (props.kind === "node") return { id, kind: "node" };

        const subtree = groupToTree(props.group);
        if (props.kind === "parallel") {
          return {
            align: props.align === "end" ? "end" : undefined,
            children: subtree.children,
            kind: "parallel",
          };
        }
        return subtree;
      }),
    };
  }

  function reportNode(id: string, node: FlowMeasuredNode) {
    const current = nodes[id];
    if (
      current?.width === node.width &&
      current?.height === node.height &&
      current?.disabled === node.disabled &&
      current?.startAnchorOffset === node.startAnchorOffset &&
      current?.endAnchorOffset === node.endAnchorOffset
    ) {
      return;
    }
    nodes = { ...nodes, [id]: node };
  }

  function removeNode(id: string) {
    if (!(id in nodes)) return;
    const next = { ...nodes };
    delete next[id];
    nodes = next;
  }

  setFlowDiagramContext({
    get align() {
      return align;
    },
    get orientation() {
      return orientation;
    },
    get edges() {
      return edges;
    },
    get nodePositions() {
      return nodePositions;
    },
    get nodes() {
      return nodes;
    },
    removeNode,
    reportNode,
  });
  setFlowNodeGroupContext(rootGroup);

  function isEventFromNode(target: EventTarget | null) {
    return target instanceof Element && target.closest("[data-node-id]") !== null;
  }

  function clampPan() {
    if (!bounds) return;
    if (x < bounds.x) x = bounds.x;
    if (x > 0) x = 0;
    if (y < bounds.y) y = bounds.y;
    if (y > 0) y = 0;
  }

  function measureBounds() {
    if (!wrapperElement || !contentElement) return;

    const wrapper = wrapperElement.getBoundingClientRect();
    const content = contentElement.getBoundingClientRect();
    const availableWidth = wrapper.width - padding.x * 2;
    const availableHeight = wrapper.height - padding.y * 2;
    const nextBounds = {
      x: Math.min(0, availableWidth - content.width),
      y: Math.min(0, availableHeight - content.height),
    };
    const isXOverflow = content.width > availableWidth;
    const isYOverflow = content.height > availableHeight;

    bounds = nextBounds;
    dimensions = {
      contentHeight: content.height,
      contentWidth: content.width,
      viewportHeight: availableHeight,
      viewportWidth: availableWidth,
    };
    canPan = isXOverflow || isYOverflow;
    onOverflowChange?.({ x: isXOverflow, y: isYOverflow });
    clampPan();
  }

  function handleWheel(event: WheelEvent) {
    if (!bounds) return;
    if (!canScrollX && !canScrollY) return;

    event.preventDefault();

    if (canScrollY) {
      y = Math.max(bounds.y, Math.min(0, y - event.deltaY));
    }
    if (canScrollX) {
      x = Math.max(bounds.x, Math.min(0, x - event.deltaX));
    }
  }

  function finishPanning() {
    stopPanning?.();
  }

  function handlePointerDown(event: PointerEvent) {
    if (!canvas || !canPan || isEventFromNode(event.target)) return;

    event.preventDefault();
    finishPanning();
    isPanning = true;
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = x;
    const initialY = y;

    function handlePointerMove(moveEvent: PointerEvent) {
      if (!bounds) return;
      x = Math.max(bounds.x, Math.min(0, initialX + moveEvent.clientX - startX));
      y = Math.max(bounds.y, Math.min(0, initialY + moveEvent.clientY - startY));
    }

    function cleanup() {
      isPanning = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", cleanup);
      stopPanning = undefined;
    }

    stopPanning = cleanup;
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", cleanup);
  }

  function observeCanvas() {
    cleanupCanvasObserver?.();
    if (!wrapperElement || !contentElement) return;

    measureBounds();
    const wrapper = wrapperElement;
    const content = contentElement;
    const observer = new ResizeObserver(measureBounds);
    observer.observe(wrapper);
    observer.observe(content);
    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    cleanupCanvasObserver = () => {
      observer.disconnect();
      wrapper.removeEventListener("wheel", handleWheel);
      cleanupCanvasObserver = undefined;
    };
  }

  const wrapperAction: Action<HTMLDivElement, typeof canvasActionData> = (element) => {
    wrapperElement = element;
    observeCanvas();

    return {
      update() {
        measureBounds();
        clampPan();
      },
      destroy() {
        cleanupCanvasObserver?.();
        finishPanning();
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        if (wrapperElement === element) wrapperElement = null;
      },
    };
  };

  const contentAction: Action<HTMLDivElement> = (element) => {
    contentElement = element;
    observeCanvas();

    return {
      destroy() {
        cleanupCanvasObserver?.();
        if (contentElement === element) contentElement = null;
      },
    };
  };
</script>

{#if canvas}
  <div
    use:wrapperAction={canvasActionData}
    class={cn("group relative isolate grow overflow-hidden", className)}
    style:padding-top={`${padding.y}px`}
    style:padding-bottom={`${padding.y}px`}
    style:padding-left={`${padding.x}px`}
    style:padding-right={`${padding.x}px`}
    style:cursor={canPan && !isPanning ? "grab" : undefined}
    onpointerdown={handlePointerDown}
    {...restProps}
  >
    <div
      use:contentAction
      data-testid="flow-contents"
      class="relative mx-auto"
      style={contentStyle}
      style:width={diagramRect.width ? `${diagramRect.width}px` : undefined}
      style:height={diagramRect.height ? `${diagramRect.height}px` : undefined}
    >
      <ul use:observeFlowNodeGroup={rootGroup} class="m-0 list-none p-0">
        {@render children?.()}
      </ul>
      <div class="pointer-events-none absolute inset-0">
        <Connectors {connectors} {orientation} />
      </div>
    </div>

    {#if canScrollY}
      <div
        class="absolute top-1 right-1 bottom-1 w-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100"
      >
        <div
          class="absolute w-full rounded-full bg-kumo-fill"
          style:height={`${scrollThumbHeight}%`}
          style:top={scrollTop}
        ></div>
      </div>
    {/if}

    {#if canScrollX}
      <div
        class="absolute right-1 bottom-1 left-1 h-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100"
      >
        <div
          class="absolute h-full rounded-full bg-kumo-fill"
          style:width={`${scrollThumbWidth}%`}
          style:left={scrollLeft}
        ></div>
      </div>
    {/if}
  </div>
{:else}
  <div class={cn("relative grow", className)} {...restProps}>
    <div
      class="relative"
      style:width={diagramRect.width ? `${diagramRect.width}px` : undefined}
      style:height={diagramRect.height ? `${diagramRect.height}px` : undefined}
    >
      <ul use:observeFlowNodeGroup={rootGroup} class="m-0 list-none p-0">
        {@render children?.()}
      </ul>
      <div class="pointer-events-none absolute inset-0">
        <Connectors {connectors} {orientation} />
      </div>
    </div>
  </div>
{/if}
