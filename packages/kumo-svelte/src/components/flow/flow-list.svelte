<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import { cn } from "../../utils";
  import {
    FlowNodeGroup,
    observeFlowNodeGroup,
    setFlowNodeGroupContext,
    useFlowNodeGroup,
    type FlowGroupNodeData,
  } from "./context.svelte";

  export interface FlowListProps {
    children?: Snippet;
    class?: string;
    id?: string;
  }

  let { children, class: className, id: idProp }: FlowListProps = $props();

  const parentGroup = useFlowNodeGroup("Flow.List");
  const group = new FlowNodeGroup();
  const generatedId = $props.id();

  setFlowNodeGroupContext(group);

  let id = $derived(idProp ?? generatedId);
  let registration = $derived<FlowGroupNodeData>({ group, kind: "list" });
  let actionData = $derived({ id, registration });

  const listAction: Action<HTMLLIElement, typeof actionData> = (element, data) => {
    let current = data;
    let unregister = parentGroup.register(current.id, element, current.registration);

    return {
      update(next) {
        if (next.id !== current.id) {
          unregister();
          unregister = parentGroup.register(next.id, element, next.registration);
        } else {
          parentGroup.update(next.id, next.registration, element);
        }
        current = next;
      },
      destroy() {
        unregister();
      },
    };
  };
</script>

<li use:listAction={actionData} class="contents" data-node-index={parentGroup.indexOf(id)}>
  <ul use:observeFlowNodeGroup={group} class={cn("m-0 list-none p-0", className)}>
    {@render children?.()}
  </ul>
</li>
