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
    context.registerAnchor(anchorType, element);

    return {
      update(nextType) {
        context.registerAnchor(anchorType, null);
        anchorType = nextType;
        context.registerAnchor(anchorType, element);
      },
      destroy() {
        context.registerAnchor(anchorType, null);
      },
    };
  };
</script>

<div use:anchorAction={type} {...restProps} class={cn(className)}>
  {@render children?.()}
</div>
