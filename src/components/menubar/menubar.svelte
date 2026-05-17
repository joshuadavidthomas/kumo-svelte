<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toolbar as ToolbarPrimitive, Tooltip as TooltipPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { getKumoPortalContext } from "../../utils/portal-provider.svelte";
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

  const portalContext = getKumoPortalContext();

  function optionId(option: MenuBarOption, index: number) {
    return optionIds ? option.id : index;
  }
</script>

<ToolbarPrimitive.Root
  class={cn(menuBarVariants(), className)}
  {...restProps}
>
  {#each options as option, index (option.id ?? index)}
    {@const active = isActive === optionId(option, index)}
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger>
        {#snippet child({ props })}
          <ToolbarPrimitive.Button
            {...props}
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
          </ToolbarPrimitive.Button>
        {/snippet}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal to={portalContext.container}>
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
</ToolbarPrimitive.Root>
