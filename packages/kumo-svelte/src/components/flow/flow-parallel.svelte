<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Action } from "svelte/action";
  import {
    FlowNodeGroup,
    observeFlowNodeGroup,
    setFlowNodeGroupContext,
    useFlowNodeGroup,
    type FlowGroupNodeData,
  } from "./context.svelte";
  import type { FlowParallelAlign } from "./types";

  export interface FlowParallelProps {
    align?: FlowParallelAlign;
    children: Snippet;
    id?: string;
  }

  let { align = "start", children, id: idProp }: FlowParallelProps = $props();

  const parentGroup = useFlowNodeGroup("Flow.Parallel");
  const childGroup = new FlowNodeGroup();
  const generatedId = $props.id();

  setFlowNodeGroupContext(childGroup);

  let id = $derived(idProp ?? generatedId);
  let index = $derived(parentGroup.indexOf(id));
  let registration = $derived<FlowGroupNodeData>({
    align: align === "end" ? "end" : undefined,
    group: childGroup,
    kind: "parallel",
  });
  let actionData = $derived({ id, registration });

  const parallelAction: Action<HTMLLIElement, typeof actionData> = (element, data) => {
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

<li use:parallelAction={actionData} class="contents" data-node-index={index}>
  <ul use:observeFlowNodeGroup={childGroup} class="m-0 list-none p-0">
    {@render children()}
  </ul>
</li>
