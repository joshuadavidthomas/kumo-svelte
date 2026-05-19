<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebar } from "./context.svelte";

  export interface SidebarResizeHandleProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
  }

  let { class: className, onpointerdown, ...restProps }: SidebarResizeHandleProps = $props();
  const sidebar = useSidebar("SidebarResizeHandle");

  function handlePointerDown(
    event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    onpointerdown?.(event);
    if (event.defaultPrevented || !sidebar.resizable) return;

    event.preventDefault();
    sidebar.setIsResizing(true);

    const startX = event.clientX;
    const startWidth = sidebar.open ? sidebar.width : sidebar.minWidth;
    let wasCollapsed = !sidebar.open;

    function handlePointerMove(moveEvent: PointerEvent) {
      const delta =
        sidebar.side === "left" ? moveEvent.clientX - startX : startX - moveEvent.clientX;
      const rawWidth = startWidth + delta;

      if (wasCollapsed) {
        if (rawWidth >= sidebar.minWidth) {
          wasCollapsed = false;
          sidebar.setOpen(true);
          sidebar.setWidth(rawWidth);
        }
        return;
      }

      if (rawWidth < sidebar.minWidth) {
        sidebar.setOpen(false);
        wasCollapsed = true;
        return;
      }

      sidebar.setWidth(rawWidth);
    }

    function cleanup() {
      sidebar.setIsResizing(false);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", cleanup);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", cleanup);
  }
</script>

{#if sidebar.resizable}
  <div
    data-sidebar="resize-handle"
    class={cn(
      "absolute inset-y-0 z-20 hidden w-1 cursor-col-resize transition-colors sm:block",
      "hover:bg-kumo-brand/30 active:bg-kumo-brand/50",
      sidebar.side === "left" && "right-0",
      sidebar.side === "right" && "left-0",
      className,
    )}
    onpointerdown={handlePointerDown}
    {...restProps}
  ></div>
{/if}
