<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useFlowNodeAnchorContext } from "./context.svelte";
  import type { FlowAnchorType } from "./types";

  export interface FlowAnchorProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
    type?: FlowAnchorType;
  }

  let { children, class: className, type, ...restProps }: FlowAnchorProps = $props();

  const context = useFlowNodeAnchorContext();
  let anchorElement = $state<HTMLElement | null>(null);

  const anchorAction: Action<HTMLElement> = (element) => {
    anchorElement = element;
    return {
      destroy() {
        if (anchorElement === element) anchorElement = null;
      },
    };
  };

  $effect(() => {
    const element = anchorElement;
    if (!element) return;

    if (type === "start" || type === undefined) {
      context.registerStartAnchor(element);
    }
    if (type === "end" || type === undefined) {
      context.registerEndAnchor(element);
    }

    return () => {
      if (type === "start" || type === undefined) {
        context.registerStartAnchor(null);
      }
      if (type === "end" || type === undefined) {
        context.registerEndAnchor(null);
      }
    };
  });
</script>

<div use:anchorAction {...restProps} class={cn(className)}>
  {@render children?.()}
</div>

