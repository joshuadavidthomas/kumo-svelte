<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useSidebar } from "./context.svelte";

  export interface SidebarResizeHandleProps
    extends Omit<HTMLButtonAttributes, "class" | "type"> {
    class?: string;
  }

  let {
    class: className,
    onkeydown,
    onpointerdown,
    ...restProps
  }: SidebarResizeHandleProps = $props();
  const sidebar = useSidebar("SidebarResizeHandle");

  let stopResizing: (() => void) | undefined;
  const keyboardStep = 10;
  let valueNow = $derived(sidebar.open ? sidebar.width : sidebar.minWidth);
  let valueText = $derived(sidebar.open ? `${sidebar.width}px` : "Collapsed");

  function handlePointerDown(
    event: PointerEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onpointerdown?.(event);
    if (event.defaultPrevented || !sidebar.resizable) return;

    event.preventDefault();
    stopResizing?.();
    sidebar.setIsResizing(true);

    const startX = event.clientX;
    const wrapper = event.currentTarget.closest("[data-sidebar-wrapper]");
    const sidebarElement = wrapper?.querySelector("[data-sidebar='sidebar']");
    const startWidth = sidebarElement?.getBoundingClientRect().width ?? 0;
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
      stopResizing = undefined;
    }

    stopResizing = cleanup;
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", cleanup);
  }

  function handleKeyDown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onkeydown?.(event);
    if (event.defaultPrevented) return;

    const grow = sidebar.side === "left" ? "ArrowRight" : "ArrowLeft";
    const shrink = sidebar.side === "left" ? "ArrowLeft" : "ArrowRight";

    if (event.key === grow) {
      event.preventDefault();
      if (!sidebar.open) {
        sidebar.setOpen(true);
        sidebar.setWidth(sidebar.minWidth);
      } else {
        sidebar.setWidth(Math.min(sidebar.width + keyboardStep, sidebar.maxWidth));
      }
    } else if (event.key === shrink) {
      event.preventDefault();
      const nextWidth = sidebar.width - keyboardStep;
      if (nextWidth < sidebar.minWidth) {
        sidebar.setOpen(false);
      } else {
        sidebar.setWidth(nextWidth);
      }
    } else if (event.key === "Home") {
      event.preventDefault();
      sidebar.setOpen(false);
    } else if (event.key === "End") {
      event.preventDefault();
      sidebar.setOpen(true);
      sidebar.setWidth(sidebar.maxWidth);
    }
  }

  onDestroy(() => {
    stopResizing?.();
  });
</script>

{#if sidebar.resizable}
  <button
    type="button"
    role="separator"
    aria-label="Resize sidebar"
    aria-orientation="vertical"
    aria-valuemin={sidebar.minWidth}
    aria-valuemax={sidebar.maxWidth}
    aria-valuenow={valueNow}
    aria-valuetext={valueText}
    tabindex={0}
    data-sidebar="resize-handle"
    class={cn(
      "absolute inset-y-0 z-2 hidden w-3 cursor-col-resize sm:block",
      "after:absolute after:inset-y-0 after:w-0.5 after:bg-transparent after:transition-colors",
      "hover:after:bg-kumo-hairline active:after:bg-kumo-hairline focus-visible:after:bg-kumo-hairline",
      "focus-visible:outline-none",
      sidebar.side === "left" && "right-0 after:right-0",
      sidebar.side === "right" && "left-0 after:left-0",
      className,
    )}
    onpointerdown={handlePointerDown}
    onkeydown={handleKeyDown}
    {...restProps}
  ></button>
{/if}
