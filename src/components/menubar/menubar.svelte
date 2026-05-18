<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toolbar as ToolbarPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import TooltipContent from "../tooltip/tooltip-content.svelte";
  import TooltipRoot from "../tooltip/tooltip-root.svelte";
  import TooltipTrigger from "../tooltip/tooltip-trigger.svelte";
  import { menuBarVariants } from "./variants";

  export interface MenuBarOption {
    icon: Snippet;
    id?: number | string;
    onClick: () => void;
    tooltip: string;
  }

  export interface MenuBarProps
    extends Omit<ToolbarPrimitive.RootProps, "class" | "child" | "children"> {
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
</script>

<ToolbarPrimitive.Root
  data-slot="menubar"
  class={cn(menuBarVariants(), className)}
  {...restProps}
>
  {#each options as option, index (option.id ?? index)}
    {@const active = isActive === optionId(option, index)}
    <TooltipRoot>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToolbarPrimitive.Button
            {...props}
            data-slot="menubar-button"
            aria-label={option.tooltip}
            aria-pressed={active}
            onclick={() => option.onClick()}
            class={cn(
              "relative -ml-px flex h-full w-11 cursor-pointer items-center justify-center rounded-md border-none bg-kumo-recessed transition-colors",
              "first:rounded-l-lg last:rounded-r-lg focus:z-3 focus:outline-none focus:ring-kumo-focus/50 focus-visible:z-3 focus-visible:ring-2 focus-visible:ring-kumo-brand",
              active && "z-2 bg-kumo-base shadow-xs",
            )}
          >
            <span data-slot="menubar-button-icon" class="flex items-center justify-center [&_svg]:size-[18px]">
              {@render option.icon()}
            </span>
          </ToolbarPrimitive.Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        arrow={false}
        class={cn(
          "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default",
          "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
        )}
      >
        {option.tooltip}
      </TooltipContent>
    </TooltipRoot>
  {/each}
</ToolbarPrimitive.Root>
