<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip as TooltipPrimitive } from "bits-ui";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { isInsideSidebarMenuItem, useSidebar } from "./context.svelte";

  export type SidebarMenuButtonSize = "base" | "sm";

  export interface SidebarMenuButtonProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    active?: boolean;
    children?: Snippet;
    class?: string;
    href?: string;
    icon?: Snippet;
    linkProps?: Omit<HTMLAnchorAttributes, "children" | "class" | "href">;
    size?: SidebarMenuButtonSize;
    tooltip?: string;
  }

  let {
    active = false,
    children,
    class: className,
    href,
    icon,
    linkProps,
    size = "base",
    tooltip,
    ...restProps
  }: SidebarMenuButtonProps = $props();

  const sidebar = useSidebar("SidebarMenuButton");
  const insideMenuItem = isInsideSidebarMenuItem();

  let buttonClasses = $derived(
    cn(
      "group/menu-button flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg",
      size === "base" && "min-h-[34px] px-3 py-1.5 text-sm font-medium",
      size === "sm" && "min-h-[28px] px-2 py-1 text-sm",
      "text-kumo-default transition-[color,background-color,padding] duration-0 ease-[cubic-bezier(0.77,0,0.175,1)]",
      "[&>svg]:text-kumo-subtle",
      !active && "hover:bg-kumo-tint",
      active && "bg-kumo-tint",
      "has-[[data-active]]:bg-transparent has-[[data-active]]:hover:bg-kumo-tint",
      "focus-visible:ring-2 focus-visible:ring-kumo-brand",
      "group-data-[state=collapsed]/sidebar:px-2",
      className,
    ),
  );
</script>

{#snippet Content()}
  {@render icon?.()}
  <span
    class={cn(
      "flex min-w-0 flex-1 items-center overflow-hidden text-left",
      "group-data-[state=collapsed]/sidebar:hidden",
    )}
  >
    {@render children?.()}
  </span>
{/snippet}

{#snippet Button(props: Record<string, unknown> = {})}
  {#if href}
    <a
      {...props}
      {...linkProps}
      href={href}
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-size={size}
      class={cn(buttonClasses, "no-underline!")}
    >
      {@render Content()}
    </a>
  {:else}
    <button
      {...props}
      {...restProps}
      type="button"
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-size={size}
      class={buttonClasses}
    >
      {@render Content()}
    </button>
  {/if}
{/snippet}

{#snippet MaybeTooltip()}
  {#if sidebar.state === "collapsed" && tooltip}
    <TooltipPrimitive.Root delayDuration={0}>
      <TooltipPrimitive.Trigger>
        {#snippet child({ props })}
          {@render Button(props)}
        {/snippet}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          sideOffset={10}
          class={cn(
            "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default",
            "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
          )}
        >
          {tooltip}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  {:else}
    {@render Button()}
  {/if}
{/snippet}

{#if insideMenuItem}
  {@render MaybeTooltip()}
{:else}
  <li data-sidebar="menu-item" class="relative">
    {@render MaybeTooltip()}
  </li>
{/if}
