<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { useFlowNodeAnchorContext } from "./context.svelte";
  import type { FlowAnchorRenderSnippet, FlowAnchorType } from "./types";

  export interface FlowAnchorProps {
    children?: Snippet;
    render?: FlowAnchorRenderSnippet;
    type?: FlowAnchorType;
  }

  let { children, render, type }: FlowAnchorProps = $props();

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

{#if render}
  {@render render({ action: anchorAction })}
{:else}
  <div use:anchorAction>
    {@render children?.()}
  </div>
{/if}

