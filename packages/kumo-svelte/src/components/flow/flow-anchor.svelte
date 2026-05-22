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

  const anchorAction: Action<HTMLElement, FlowAnchorType | undefined> = (element, anchorType) => {
    function register(nextType: FlowAnchorType | undefined) {
      if (nextType === "start" || nextType === undefined) {
        context.registerStartAnchor(element);
      }
      if (nextType === "end" || nextType === undefined) {
        context.registerEndAnchor(element);
      }
    }

    function unregister(nextType: FlowAnchorType | undefined) {
      if (nextType === "start" || nextType === undefined) {
        context.registerStartAnchor(null);
      }
      if (nextType === "end" || nextType === undefined) {
        context.registerEndAnchor(null);
      }
    }

    register(anchorType);

    return {
      update(nextType) {
        unregister(anchorType);
        anchorType = nextType;
        register(anchorType);
      },
      destroy() {
        unregister(anchorType);
      },
    };
  };
</script>

<div use:anchorAction={type} {...restProps} class={cn(className)}>
  {@render children?.()}
</div>

