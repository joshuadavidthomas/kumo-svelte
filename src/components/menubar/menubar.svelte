<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { menuBarVariants } from "./variants";

  export interface MenuBarOption {
    icon: Snippet;
    id?: number | string;
    onClick: () => void;
    tooltip: string;
  }

  export interface MenuBarProps
    extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
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

  function optionId(option: MenuBarOption, index: number) {
    return optionIds ? option.id : index;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const buttons = Array.from(target.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
    if (buttons.length === 0) {
      return;
    }

    const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const currentIndex = activeIndex === -1 ? 0 : activeIndex;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }

    event.preventDefault();
    buttons[nextIndex]?.focus();
  }
</script>

<nav
  class={cn(menuBarVariants(), className)}
  onkeydown={handleKeydown}
  {...restProps}
>
  {#each options as option, index (option.id ?? index)}
    {@const active = isActive === optionId(option, index)}
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger>
        {#snippet child({ props })}
          <button
            {...props}
            type="button"
            aria-label={option.tooltip}
            aria-pressed={active}
            onclick={() => option.onClick()}
            class={cn(
              "relative -ml-px flex h-full w-11 cursor-pointer items-center justify-center rounded-md border-none bg-kumo-recessed transition-colors",
              "first:rounded-l-lg last:rounded-r-lg focus:z-3 focus:outline-none focus:ring-kumo-focus/50 focus-visible:z-3 focus-visible:ring-2 focus-visible:ring-kumo-brand",
              active && "z-2 bg-kumo-base shadow-xs",
            )}
          >
            <span class="flex items-center justify-center [&_svg]:size-[18px]">
              {@render option.icon()}
            </span>
          </button>
        {/snippet}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={8}
          class={cn(
            "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default",
            "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
          )}
        >
          {option.tooltip}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  {/each}
</nav>

