<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Tooltip from "../tooltip/tooltip.svelte";
  import { menuBarVariants } from "./variants";

  export interface MenuBarOption {
    icon: Snippet;
    id?: number | string;
    onSelect: () => void;
    tooltip: string;
  }

  export interface MenuBarProps extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    class?: string;
    isActive: number | boolean | string | undefined;
    optionIds?: boolean;
    options: MenuBarOption[];
  }

  let {
    class: className,
    isActive,
    optionIds = false,
    options,
    ...restProps
  }: MenuBarProps = $props();

  let root: HTMLElement | undefined = $state();

  function optionId(option: MenuBarOption, index: number) {
    return optionIds ? option.id : index;
  }

  function selectOption(option: MenuBarOption, _index: number) {
    option.onSelect();
  }

  function focusButton(offset: number) {
    if (!root) return;
    const buttons = [...root.querySelectorAll<HTMLButtonElement>("button")];
    const current = document.activeElement instanceof HTMLButtonElement ? buttons.indexOf(document.activeElement) : -1;
    const next = current === -1 ? 0 : (current + offset + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusButton(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusButton(-1);
    }
  }
</script>

<nav
  bind:this={root}
  data-slot="menubar"
  class={cn(menuBarVariants(), className)}
  onkeydown={handleKeydown}
  {...restProps}
>
  {#each options as option, index (option.id ?? index)}
    {@const active = isActive === optionId(option, index)}
    {#snippet button({ props }: { props: Record<string, unknown> })}
      <button
        {...props}
        data-slot="menubar-button"
        aria-label={option.tooltip}
        title={option.tooltip}
        onclick={() => selectOption(option, index)}
        class={cn(
          "relative -ml-px flex h-full w-11 cursor-pointer items-center justify-center rounded-md border-none bg-kumo-recessed transition-colors",
          "first:rounded-l-lg last:rounded-r-lg focus:z-3 focus:outline-none focus:ring-kumo-focus/50 focus-visible:z-3 focus-visible:ring-2 focus-visible:ring-kumo-brand",
          active && "z-2 bg-kumo-base shadow-xs",
        )}
      >
        <span data-slot="menubar-button-icon" class="flex items-center justify-center [&_svg]:size-[18px]">
          {@render option.icon()}
        </span>
      </button>
    {/snippet}

    <Tooltip content={option.tooltip} render={button} />
  {/each}
</nav>
