<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { setToolbarContext } from "./context";
  import {
    KUMO_TOOLBAR_DEFAULT_VARIANTS,
    toolbarVariants,
    type ToolbarSize,
  } from "./variants";

  export interface ToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    children: Snippet;
    class?: string;
    size?: ToolbarSize;
  }

  let {
    children,
    class: className,
    onkeydown,
    role = "toolbar",
    size = KUMO_TOOLBAR_DEFAULT_VARIANTS.size,
    ...restProps
  }: ToolbarProps = $props();

  let root: HTMLDivElement | undefined = $state();

  setToolbarContext({
    get size() {
      return size;
    },
  });

  function isTextEditingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;

    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target.isContentEditable
    );
  }

  function focusableControls() {
    if (!root) return [];

    return [...root.querySelectorAll<HTMLElement>([
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(","))].filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");
  }

  function focusControl(offset: number) {
    const controls = focusableControls();
    if (!controls.length) return;

    const current = document.activeElement instanceof HTMLElement ? controls.indexOf(document.activeElement) : -1;
    const next = current === -1 ? 0 : (current + offset + controls.length) % controls.length;
    controls[next]?.focus();
  }

  function focusBoundary(index: number) {
    const controls = focusableControls();
    const resolvedIndex = index < 0 ? controls.length + index : index;
    controls[resolvedIndex]?.focus();
  }

  function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    onkeydown?.(event);
    if (event.defaultPrevented || isTextEditingTarget(event.target)) return;

    const orientation = (restProps as Record<string, unknown>)["aria-orientation"];
    const vertical = orientation === "vertical";

    if ((!vertical && event.key === "ArrowRight") || (vertical && event.key === "ArrowDown")) {
      event.preventDefault();
      focusControl(1);
    }

    if ((!vertical && event.key === "ArrowLeft") || (vertical && event.key === "ArrowUp")) {
      event.preventDefault();
      focusControl(-1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusBoundary(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusBoundary(-1);
    }
  }
</script>

<div
  bind:this={root}
  data-kumo-component="Toolbar"
  data-slot="toolbar"
  {role}
  class={cn(toolbarVariants({ size }), className)}
  onkeydown={handleKeydown}
  {...restProps}
>
  {@render children()}
</div>
