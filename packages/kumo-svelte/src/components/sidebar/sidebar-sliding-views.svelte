<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { setSidebarSlidingViewsContext, type SidebarSlidingViewsContextValue } from "./context.svelte";

  export interface SidebarSlidingViewsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    /** Key of the currently active view. Must match a child `SidebarSlidingView` value. */
    activeKey: string;
    children: Snippet;
    class?: string;
    /**
     * Slide direction for the transition.
     * - `left`: new view slides in from the right
     * - `right`: new view slides in from the left
     */
    direction?: "left" | "right";
    ref?: HTMLDivElement | null;
  }

  let {
    activeKey,
    children,
    class: className,
    direction = "left",
    ref = $bindable(null),
    ...restProps
  }: SidebarSlidingViewsProps = $props();

  let views = $state<Array<{ id: symbol; value: string }>>([]);

  const context: SidebarSlidingViewsContextValue = {
    get activeKey() {
      return activeKey;
    },
    isActive(value) {
      return activeKey === value;
    },
    register() {
      const id = Symbol("sidebar-sliding-view");
      views.push({ id, value: "" });
      return id;
    },
    unregister(id) {
      const index = views.findIndex((view) => view.id === id);
      if (index !== -1) {
        views.splice(index, 1);
      }
    },
    update(id, value) {
      const view = views.find((entry) => entry.id === id);
      if (view) {
        view.value = value;
      }
    },
  };

  setSidebarSlidingViewsContext(context);

  let activeIndex = $derived.by(() => {
    const index = views.findIndex((view) => view.value === activeKey);
    return index === -1 ? 0 : index;
  });
</script>

<div
  bind:this={ref}
  data-slot="sidebar-sliding-views"
  data-sidebar="sliding-views"
  data-direction={direction}
  class={cn("flex min-h-0 max-w-(--sidebar-width) flex-1 overflow-hidden", className)}
  {...restProps}
>
  <div
    class="flex min-h-0 w-full shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none"
    style:transform={`translateX(-${activeIndex * 100}%)`}
  >
    {@render children()}
  </div>
</div>
