<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { cn } from "../../utils";
  import {
    setFlowNodeAnchorContext,
    useFlowNodeGroup,
  } from "./context.svelte";
  import { sameRect, toRectLike } from "./geometry";
  import type {
    FlowNodeData,
    FlowNodeRenderSnippet,
    RectLike,
  } from "./types";

  export interface FlowNodeProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    id?: string;
    render?: FlowNodeRenderSnippet;
  }

  let {
    children,
    class: className,
    disabled = false,
    id: idProp,
    render,
  }: FlowNodeProps = $props();

  const group = useFlowNodeGroup();
  const generatedId = $props.id();

  let id = $derived(idProp ?? generatedId);
  let index = $derived(group.indexOf(id));
  let nodeElement = $state<HTMLElement | null>(null);
  let startAnchorElement = $state<HTMLElement | null>(null);
  let endAnchorElement = $state<HTMLElement | null>(null);
  let startRect = $state<RectLike | null>(null);
  let endRect = $state<RectLike | null>(null);

  let nodeData = $derived<FlowNodeData>({
    disabled,
    end: endRect,
    parallel: false,
    start: startRect,
  });

  const nodeAction: Action<HTMLElement> = (element) => {
    nodeElement = element;
    return {
      destroy() {
        if (nodeElement === element) nodeElement = null;
      },
    };
  };

  function measure() {
    if (!nodeElement) return;

    const nodeRect = toRectLike(nodeElement.getBoundingClientRect());
    const nextStartRect = toRectLike(
      (startAnchorElement ?? nodeElement).getBoundingClientRect(),
    );
    const nextEndRect = toRectLike(
      (endAnchorElement ?? nodeElement).getBoundingClientRect(),
    );

    startRect = sameRect(startRect, nextStartRect) ? startRect : nextStartRect;
    endRect = sameRect(endRect, nextEndRect) ? endRect : nextEndRect;

    if (!startAnchorElement && !endAnchorElement) {
      startRect = sameRect(startRect, nodeRect) ? startRect : nodeRect;
      endRect = sameRect(endRect, nodeRect) ? endRect : nodeRect;
    }
  }

  setFlowNodeAnchorContext({
    registerEndAnchor(element) {
      endAnchorElement = element;
      measure();
    },
    registerStartAnchor(element) {
      startAnchorElement = element;
      measure();
    },
  });

  $effect(() => {
    const element = nodeElement;
    const currentId = id;
    if (!element) return;

    return group.register(currentId, element, { parallel: false });
  });

  $effect(() => {
    const element = nodeElement;
    if (!element) return;
    group.update(id, nodeData, element);
  });

  $effect(() => {
    const element = nodeElement;
    const startElement = startAnchorElement;
    const endElement = endAnchorElement;
    if (!element) return;

    const onLayoutChange = () => {
      measure();
      group.notifySizeChange();
    };

    measure();
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

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onLayoutChange, { capture: true });
      window.removeEventListener("resize", onLayoutChange);
    };
  });
</script>

{#if render}
  {@render render({
    action: nodeAction,
    attrs: {
      "data-node-id": id,
      "data-node-index": index,
      "data-testid": id,
      style: "cursor: default;",
    },
    disabled,
    id,
    index,
  })}
{:else}
  <li
    use:nodeAction
    class={cn("rounded-md bg-kumo-base px-3 py-2 shadow ring ring-kumo-line", className)}
    style:cursor="default"
    data-node-index={index}
    data-node-id={id}
    data-testid={id}
  >
    {@render children?.()}
  </li>
{/if}
