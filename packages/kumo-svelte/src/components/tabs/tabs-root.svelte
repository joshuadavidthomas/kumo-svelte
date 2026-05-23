<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { setTabsStyleContext } from "./context";
  import {
    KUMO_TABS_DEFAULT_VARIANTS,
    type KumoTabsSize,
    type KumoTabsVariant,
  } from "./variants";

  export type TabsRootProps = TabsPrimitive.RootProps & {
    activateOnFocus?: boolean;
    indicatorClassName?: string;
    size?: KumoTabsSize;
    variant?: KumoTabsVariant;
  };

  let {
    activateOnFocus,
    activationMode,
    children,
    class: className,
    indicatorClassName,
    onValueChange,
    size = KUMO_TABS_DEFAULT_VARIANTS.size,
    value = $bindable(""),
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
    ...restProps
  }: TabsRootProps = $props();

  const tabsStyle = $state<{
    indicatorClassName?: string;
    indicatorStyle: string;
    size: KumoTabsSize;
    variant: KumoTabsVariant;
  }>({
    indicatorClassName: undefined,
    indicatorStyle: "",
    size: KUMO_TABS_DEFAULT_VARIANTS.size,
    variant: KUMO_TABS_DEFAULT_VARIANTS.variant,
  });
  setTabsStyleContext(tabsStyle);

  let rootEl = $state<HTMLElement | null>(null);
  let hasIndicator = $derived(variant === "segmented" || variant === "underline");
  let resolvedActivationMode = $derived(
    activateOnFocus === undefined ? activationMode : activateOnFocus ? "automatic" : "manual",
  );

  $effect(() => {
    tabsStyle.indicatorClassName = indicatorClassName;
    tabsStyle.size = size;
    tabsStyle.variant = variant;
  });

  function updateIndicator() {
    if (!rootEl || !hasIndicator) {
      tabsStyle.indicatorStyle = "";
      return;
    }

    const list = rootEl.querySelector<HTMLElement>('[data-slot="tabs-list"]');
    const active = rootEl.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]',
    );

    if (!list || !active) {
      tabsStyle.indicatorStyle = "";
      return;
    }

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left = activeRect.left - listRect.left + list.scrollLeft;

    tabsStyle.indicatorStyle = `--active-tab-left: ${left}px; --active-tab-top: ${active.offsetTop}px; --active-tab-width: ${activeRect.width}px; --active-tab-height: ${activeRect.height}px;`;
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
    tick().then(updateIndicator);
  }

  $effect(() => {
    void [value, size, variant, hasIndicator];
    tick().then(updateIndicator);
  });

  onMount(() => {
    updateIndicator();
    if (!rootEl) return;

    const list = rootEl.querySelector<HTMLElement>('[data-slot="tabs-list"]');
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(rootEl);
    if (list) {
      observer.observe(list);
      list.addEventListener("scroll", updateIndicator);
    }
    for (const trigger of rootEl.querySelectorAll('[data-slot="tabs-trigger"]')) {
      observer.observe(trigger);
    }

    return () => {
      observer.disconnect();
      list?.removeEventListener("scroll", updateIndicator);
    };
  });
</script>

<div bind:this={rootEl} class={cn("relative min-w-0", className)}>
  <TabsPrimitive.Root
    bind:value
    onValueChange={handleValueChange}
    activationMode={resolvedActivationMode}
    data-slot="tabs"
    class="relative isolate min-w-0 font-medium"
    {...restProps}
  >
    {@render children?.()}
  </TabsPrimitive.Root>
</div>
