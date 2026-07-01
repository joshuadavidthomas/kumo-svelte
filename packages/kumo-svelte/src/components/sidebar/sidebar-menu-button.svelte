<script lang="ts">
  import { mergeProps } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useLinkComponent } from "../../utils/link-context.svelte";
  import TooltipContent from "../tooltip/tooltip-content.svelte";
  import TooltipRoot from "../tooltip/tooltip-root.svelte";
  import TooltipTrigger from "../tooltip/tooltip-trigger.svelte";
  import { isInsideSidebarMenuItem, useSidebar } from "./context.svelte";

  export type SidebarMenuButtonSize = "base" | "sm";
  type ChildProps = Record<string, unknown>;

  export interface SidebarMenuButtonProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    active?: boolean;
    /** Render a custom interactive element. Spread `props` onto that element. */
    child?: Snippet<[{ props: ChildProps }]>;
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
    child,
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
  const LinkComponent = useLinkComponent();
  const insideMenuItem = isInsideSidebarMenuItem();

  let buttonClasses = $derived(
    cn(
      "group/menu-button relative flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg outline-none",
      "before:absolute before:inset-x-0 before:-inset-y-px",
      size === "base" && "min-h-[34px] px-3 py-0 text-sm font-medium",
      size === "sm" && "min-h-[28px] px-2 py-0 text-sm",
      "text-kumo-default transition-[color,box-shadow,outline] duration-(--sidebar-animation-duration)",
      !active && "hover:bg-(--sidebar-active-bg)",
      active && "bg-(--sidebar-active-bg)",
      "has-[[data-active]]:bg-transparent has-[[data-active]]:hover:bg-(--sidebar-active-bg)",
      "focus-visible:bg-(--sidebar-active-bg) focus-visible:text-kumo-strong",
      className,
    ),
  );

  let baseProps = $derived({
    ...restProps,
    class: buttonClasses,
    "data-slot": "sidebar-menu-button",
    "data-active": active || undefined,
    "data-sidebar": "menu-button",
    "data-kumo-component": "Sidebar",
    "data-size": size,
  });

  function buttonProps(props: ChildProps = {}) {
    return mergeProps(
      {
        ...baseProps,
        "data-kumo-part": "menu-button",
      },
      props,
    ) as ChildProps;
  }

  function anchorProps(props: ChildProps = {}) {
    return mergeProps(
      {
        ...baseProps,
        ...linkProps,
        href,
        class: cn(buttonClasses, "no-underline!"),
        "data-kumo-part": "menu-button-link",
      },
      props,
    ) as ChildProps;
  }

  function linkComponentProps(props: ChildProps = {}) {
    return mergeProps(anchorProps(), { to: href }, props) as ChildProps;
  }

  function customChildProps(props: ChildProps = {}) {
    return href ? linkComponentProps(props) : buttonProps(props);
  }
</script>

{#snippet Content()}
  <div
    class={cn(
      "flex min-w-0 flex-1 items-center gap-3",
      "translate-x-[-3px] transition-transform duration-(--sidebar-animation-duration)",
      "group-not-data-[state=collapsed]/sidebar:translate-x-0",
    )}
  >
    {#if icon}
      <span
        class={cn(
          "shrink-0 text-kumo-default opacity-40",
          size === "base" && "[&>svg]:size-4",
          size === "sm" && "[&>svg]:size-3.5",
        )}
      >
        {@render icon()}
      </span>
    {/if}
    <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
      {@render children?.()}
    </span>
  </div>
{/snippet}

{#snippet Button({ props }: { props?: ChildProps })}
  {#if child}
    {@render child({ props: customChildProps(props) })}
  {:else if href && LinkComponent}
    <LinkComponent {...linkComponentProps(props)}>
      {@render Content()}
    </LinkComponent>
  {:else if href}
    <a {...anchorProps(props)}>
      {@render Content()}
    </a>
  {:else}
    <button {...buttonProps(props)} type="button">
      {@render Content()}
    </button>
  {/if}
{/snippet}

{#snippet MaybeTooltip()}
  {#if tooltip}
    <TooltipRoot delayDuration={0}>
      <TooltipTrigger>
        {#snippet child({ props })}
          {@render Button({ props })}
        {/snippet}
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        arrow={false}
        hidden={sidebar.state !== "collapsed" || sidebar.peekable}
        class={cn(
          "flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-3 py-1.5 text-xs text-kumo-default",
          "shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill",
        )}
      >
        {tooltip}
      </TooltipContent>
    </TooltipRoot>
  {:else}
    {@render Button({})}
  {/if}
{/snippet}

{#if insideMenuItem}
  {@render MaybeTooltip()}
{:else}
  <li data-slot="sidebar-menu-item" data-sidebar="menu-item" class="relative group-data-[state=collapsed]/sidebar:overflow-hidden">
    {@render MaybeTooltip()}
  </li>
{/if}
