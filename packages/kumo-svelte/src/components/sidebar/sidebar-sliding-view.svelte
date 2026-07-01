<script lang="ts">
  import { onDestroy } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebarSlidingViews } from "./context.svelte";

  export interface SidebarSlidingViewProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "class"> {
    children?: Snippet;
    class?: string;
    ref?: HTMLDivElement | null;
    /** Unique key matching this view. Must correspond to `activeKey` on `SidebarSlidingViews`. */
    value: string;
  }

  let {
    children,
    class: className,
    ref = $bindable(null),
    value,
    ...restProps
  }: SidebarSlidingViewProps = $props();

  const slidingViews = useSidebarSlidingViews("SidebarSlidingView");
  const registrationId = slidingViews.register();

  $effect(() => {
    slidingViews.update(registrationId, value);
  });

  onDestroy(() => {
    slidingViews.unregister(registrationId);
  });

  let isActive = $derived(slidingViews.isActive(value));
</script>

<div
  bind:this={ref}
  data-slot="sidebar-sliding-view"
  data-sidebar="sliding-view"
  data-value={value}
  aria-hidden={!isActive}
  inert={!isActive}
  class={cn("flex min-h-0 w-full shrink-0 flex-col", !isActive && "pointer-events-none", className)}
  {...restProps}
>
  {@render children?.()}
</div>
