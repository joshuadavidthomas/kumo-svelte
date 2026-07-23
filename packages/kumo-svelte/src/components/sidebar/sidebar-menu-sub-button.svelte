<script lang="ts">
  import { mergeProps } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../utils";
  import { useLinkComponent } from "../../utils/link-context.svelte";
  import { isInsideSidebarMenuSubItem } from "./context.svelte";

  type ChildProps = Record<string, unknown>;

  export interface SidebarMenuSubButtonProps
    extends Omit<HTMLButtonAttributes, "children" | "class" | "type"> {
    active?: boolean;
    /** Render a custom interactive element. Spread `props` onto that element. */
    child?: Snippet<[{ props: ChildProps }]>;
    children?: Snippet;
    class?: string;
    href?: string;
    linkProps?: Omit<HTMLAnchorAttributes, "children" | "class" | "href">;
    /** Link target. Only meaningful when `href` is provided. */
    target?: HTMLAnchorAttributes["target"];
  }

  let {
    active = false,
    child,
    children,
    class: className,
    href,
    linkProps,
    target,
    ...restProps
  }: SidebarMenuSubButtonProps = $props();

  const LinkComponent = useLinkComponent();
  const insideMenuSubItem = isInsideSidebarMenuSubItem();

  let buttonClasses = $derived(
    cn(
      "group/menu-button relative flex min-h-[34px] w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-0 text-sm font-medium outline-none",
      "before:absolute before:inset-x-0 before:-inset-y-px",
      "text-kumo-default transition-[color] duration-150",
      !active && "hover:bg-(--sidebar-active-bg)",
      active && "bg-(--sidebar-active-bg)",
      "focus-visible:bg-(--sidebar-active-bg) focus-visible:text-kumo-strong",
      className,
    ),
  );

  let baseProps = $derived({
    ...restProps,
    class: buttonClasses,
    "data-active": active || undefined,
    "data-sidebar": "menu-sub-button",
    "data-kumo-component": "Sidebar",
  });

  function buttonProps(props: ChildProps = {}) {
    return mergeProps(
      {
        ...baseProps,
        "data-kumo-part": "menu-sub-button",
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
        ...(target !== undefined && { target }),
        class: cn(buttonClasses, "no-underline!"),
        "data-kumo-part": "menu-sub-button-link",
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
  <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
    {@render children?.()}
  </span>
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

{#if insideMenuSubItem}
  {@render Button({})}
{:else}
  <li data-sidebar="menu-sub-item" class="relative">
    {@render Button({})}
  </li>
{/if}
