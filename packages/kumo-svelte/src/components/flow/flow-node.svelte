<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import type { HTMLLiAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import {
    setFlowNodeAnchorContext,
    useFlowNodeGroup,
  } from "./context.svelte";
  import { sameRect, toRectLike } from "./geometry";
  import type { FlowNodeData, RectLike } from "./types";

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
  const generatedId = $props.id();

  interface NodeActionData {
    id: string;
    nodeData: FlowNodeData;
  }

  let id = $derived(idProp ?? generatedId);
  let index = $derived(group.indexOf(id));
  let startAnchorElement: HTMLElement | null = null;
  let endAnchorElement: HTMLElement | null = null;
  let nodeElement: HTMLElement | null = null;
  let cleanupLayoutObserver: (() => void) | undefined;
  let measureFrame: number | undefined;
  let startRect = $state<RectLike | null>(null);
  let endRect = $state<RectLike | null>(null);

  let nodeData = $derived<FlowNodeData>({
    disabled,
    end: endRect,
    parallel: false,
    start: startRect,
  });
  let nodeActionData = $derived<NodeActionData>({ id, nodeData });

  function measure() {
    if (!nodeElement) return null;

    const nodeRect = toRectLike(nodeElement.getBoundingClientRect());
    const nextStartRect = startAnchorElement
      ? toRectLike(startAnchorElement.getBoundingClientRect())
      : nodeRect;
    const nextEndRect = endAnchorElement
      ? toRectLike(endAnchorElement.getBoundingClientRect())
      : nodeRect;

    startRect = sameRect(startRect, nextStartRect) ? startRect : nextStartRect;
    endRect = sameRect(endRect, nextEndRect) ? endRect : nextEndRect;

    return {
      disabled,
      end: nextEndRect,
      parallel: false,
      start: nextStartRect,
    } satisfies FlowNodeData;
  }

  function cancelScheduledMeasure() {
    if (measureFrame === undefined) return;
    cancelAnimationFrame(measureFrame);
    measureFrame = undefined;
  }

  function scheduleMeasure() {
    cancelScheduledMeasure();
    measureFrame = requestAnimationFrame(() => {
      measureFrame = undefined;
      const measuredNodeData = measure();
      if (nodeElement && measuredNodeData) {
        group.update(id, measuredNodeData, nodeElement);
      }
      group.notifySizeChange();
    });
  }

  function observeLayout() {
    cleanupLayoutObserver?.();
    if (!nodeElement) return;

    const element = nodeElement;
    const startElement = startAnchorElement;
    const endElement = endAnchorElement;
    const onLayoutChange = scheduleMeasure;

    scheduleMeasure();
    const observer = new ResizeObserver(onLayoutChange);
    observer.observe(element);
    if (startElement && startElement !== element) observer.observe(startElement);
    if (endElement && endElement !== element && endElement !== startElement) {
      observer.observe(endElement);
    }

    window.addEventListener("scroll", onLayoutChange, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onLayoutChange, { passive: true });

    cleanupLayoutObserver = () => {
      cancelScheduledMeasure();
      observer.disconnect();
      window.removeEventListener("scroll", onLayoutChange, { capture: true });
      window.removeEventListener("resize", onLayoutChange);
      cleanupLayoutObserver = undefined;
    };
  }

  const nodeAction: Action<HTMLElement, NodeActionData> = (element, data) => {
    nodeElement = element;
    let current = data;
    let unregister = group.register(current.id, element, current.nodeData);
    observeLayout();

    return {
      update(next) {
        if (next.id !== current.id) {
          unregister();
          unregister = group.register(next.id, element, next.nodeData);
        } else {
          group.update(next.id, next.nodeData, element);
        }
        current = next;
      },
      destroy() {
          cleanupLayoutObserver?.();
        unregister();
        if (nodeElement === element) nodeElement = null;
      },
    };
  };

  setFlowNodeAnchorContext({
    registerEndAnchor(element) {
      if (endAnchorElement === element) return;
      endAnchorElement = element;
      observeLayout();
    },
    registerStartAnchor(element) {
      if (startAnchorElement === element) return;
      startAnchorElement = element;
      observeLayout();
    },
  });
</script>

<li
  use:nodeAction={nodeActionData}
  {...restProps}
  class={cn(
    "rounded-md bg-kumo-base px-3 py-2 shadow ring ring-kumo-line data-[disabled]:bg-kumo-control data-[disabled]:text-kumo-placeholder",
    className,
  )}
  style:cursor="default"
  data-disabled={disabled ? "" : undefined}
  data-node-index={index}
  data-node-id={id}
  data-testid={id}
>
  {@render children?.()}
</li>
