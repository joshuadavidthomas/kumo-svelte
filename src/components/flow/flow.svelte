<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setFlowDiagramContext } from "./context.svelte";
  import FlowList from "./flow-list.svelte";
  import type { FlowAlign, FlowOrientation } from "./types";

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

  let wrapperElement = $state<HTMLDivElement | null>(null);
  let contentElement = $state<HTMLDivElement | null>(null);
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

  setFlowDiagramContext({
    get align() {
      return align;
    },
    get orientation() {
      return orientation;
    },
    get wrapper() {
      return wrapperElement;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
  });

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

  function handlePointerDown(event: PointerEvent) {
    if (!canvas || !canPan || isEventFromNode(event.target)) return;

    event.preventDefault();
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

    function handlePointerUp() {
      isPanning = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  }

  $effect(() => {
    if (!canvas || !wrapperElement || !contentElement) return;

    measureBounds();
    const observer = new ResizeObserver(measureBounds);
    observer.observe(wrapperElement);
    observer.observe(contentElement);

    return () => observer.disconnect();
  });

  $effect(() => {
    if (!canvas) return;
    clampPan();
  });

  $effect(() => {
    if (!canvas || !wrapperElement) return;

    wrapperElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapperElement?.removeEventListener("wheel", handleWheel);
  });

  $effect(() => {
    if (!canvas) return;

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  });
</script>

{#if canvas}
  <div
    bind:this={wrapperElement}
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
      bind:this={contentElement}
      data-testid="flow-contents"
      class="mx-auto w-max"
      style={contentStyle}
    >
      <FlowList>
        {@render children?.()}
      </FlowList>
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
    <FlowList>
      {@render children?.()}
    </FlowList>
  </div>
{/if}

