<script lang="ts">
  import ArrowLeftIcon from "phosphor-svelte/lib/ArrowLeftIcon";
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import AccountSwitcher from "./sidebar-account-switcher.svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    badge?: string;
    class?: string;
    icon: Component;
    label: string;
    onSelect?: () => void;
    tooltip?: string;
  }

  interface SubMenuItem {
    badge?: string;
    label: string;
  }

  interface NestedSubMenuItem extends SubMenuItem {
    children: SubMenuItem[];
  }

  interface CollapsibleMenuItem extends MenuItem {
    children: Array<NestedSubMenuItem | SubMenuItem>;
  }

  interface MenuSection {
    items: Array<CollapsibleMenuItem | MenuItem>;
    label?: string;
  }

  let surface = $state<"account" | "domain">("account");

  function showDomainNavigation() {
    surface = "domain";
  }

  function showAccountNavigation() {
    surface = "account";
  }

  const sidebarNavigation = {
    account: {
      search: {
        label: "Quick search…",
        icon: MagnifyingGlassIcon,
        tooltip: "Search",
        class:
          "mb-3 ring ring-kumo-line transition-[margin] duration-250 group-data-[state=collapsed]/sidebar:mb-0 group-data-[state=collapsed]/sidebar:ring-transparent",
      } satisfies MenuItem,
      sections: [
        {
          items: [
            { label: "Home", icon: HouseIcon, active: true },
            { label: "Analytics & Logs", icon: ChartBarIcon },
            { label: "Domains", icon: GlobeIcon, onSelect: showDomainNavigation },
          ],
        },
        {
          label: "Build",
          items: [
            {
              label: "Compute",
              icon: CodeIcon,
              children: [
                {
                  label: "Workers & Pages",
                  children: [{ label: "Overview" }, { label: "Workers" }, { label: "Pages" }],
                },
                { label: "Durable Objects" },
                { label: "Containers", badge: "Beta" },
              ],
            },
            { label: "Storage", icon: DatabaseIcon },
          ],
        },
        {
          label: "Protect & Connect",
          items: [
            { label: "Security", icon: ShieldCheckIcon },
            { label: "Zero Trust", icon: LockIcon, badge: "Beta" },
          ],
        },
      ] satisfies MenuSection[],
    },
    domain: {
      sections: [
        {
          items: [{ label: "Back", icon: ArrowLeftIcon, onSelect: showAccountNavigation }],
        },
        {
          label: "example.com",
          items: [
            { label: "Overview", icon: GlobeIcon, active: true },
            { label: "Security", icon: ShieldCheckIcon },
            { label: "SSL/TLS", icon: LockIcon },
            { label: "Analytics", icon: ChartBarIcon },
            { label: "Caching", icon: DatabaseIcon },
          ],
        },
      ] satisfies MenuSection[],
    },
  };

  function hasChildren(item: CollapsibleMenuItem | MenuItem): item is CollapsibleMenuItem {
    return "children" in item;
  }

  function hasNestedChildren(item: NestedSubMenuItem | SubMenuItem): item is NestedSubMenuItem {
    return "children" in item;
  }
</script>

{#snippet menuButton(item: MenuItem)}
  {@const Icon = item.icon}
  <Sidebar.MenuButton active={item.active} onclick={item.onSelect} tooltip={item.tooltip} class={item.class}>
    {#snippet icon()}<Icon />{/snippet}
    {item.label}
    {#if item.badge}<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>{/if}
  </Sidebar.MenuButton>
{/snippet}

{#snippet subMenuButton(item: SubMenuItem)}
  <Sidebar.MenuSubButton>
    {item.label}
    {#if item.badge}<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>{/if}
  </Sidebar.MenuSubButton>
{/snippet}

{#snippet nestedSubMenu(item: NestedSubMenuItem)}
  <Sidebar.MenuSubItem>
    <Sidebar.Collapsible>
      <Sidebar.CollapsibleTrigger>
        {#snippet child({ props })}
          <Sidebar.MenuSubButton {...props}>
            {item.label} <Sidebar.MenuChevron />
          </Sidebar.MenuSubButton>
        {/snippet}
      </Sidebar.CollapsibleTrigger>
      <Sidebar.CollapsibleContent>
        <Sidebar.MenuSub>
          {#each item.children as child (child.label)}
            {@render subMenuButton(child)}
          {/each}
        </Sidebar.MenuSub>
      </Sidebar.CollapsibleContent>
    </Sidebar.Collapsible>
  </Sidebar.MenuSubItem>
{/snippet}

{#snippet collapsibleMenuButton(item: CollapsibleMenuItem)}
  <Sidebar.MenuItem>
    <Sidebar.Collapsible open>
      <Sidebar.CollapsibleTrigger>
        {#snippet child({ props })}
          {@const Icon = item.icon}
          <Sidebar.MenuButton {...props}>
            {#snippet icon()}<Icon />{/snippet}
            {item.label} <Sidebar.MenuChevron />
          </Sidebar.MenuButton>
        {/snippet}
      </Sidebar.CollapsibleTrigger>
      <Sidebar.CollapsibleContent>
        <Sidebar.MenuSub>
          {#each item.children as child (child.label)}
            {#if hasNestedChildren(child)}
              {@render nestedSubMenu(child)}
            {:else}
              {@render subMenuButton(child)}
            {/if}
          {/each}
        </Sidebar.MenuSub>
      </Sidebar.CollapsibleContent>
    </Sidebar.Collapsible>
  </Sidebar.MenuItem>
{/snippet}

{#snippet menuSection(section: MenuSection)}
  <Sidebar.Group>
    {#if section.label}
      <Sidebar.GroupLabel>{section.label}</Sidebar.GroupLabel>
    {/if}
    <Sidebar.Menu>
      {#each section.items as item (item.label)}
        {#if hasChildren(item)}
          {@render collapsibleMenuButton(item)}
        {:else}
          {@render menuButton(item)}
        {/if}
      {/each}
    </Sidebar.Menu>
  </Sidebar.Group>
{/snippet}

<DemoShell>
  <Sidebar.Provider contained defaultOpen peekable class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <AccountSwitcher />
      </Sidebar.Header>

      <Sidebar.SlidingViews activeKey={surface} direction={surface === "domain" ? "left" : "right"}>
        <Sidebar.SlidingView value="account">
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.Menu>
                {@render menuButton(sidebarNavigation.account.search)}
              </Sidebar.Menu>
            </Sidebar.Group>

            {#each sidebarNavigation.account.sections as section (section.label ?? section.items[0]?.label)}
              {@render menuSection(section)}
            {/each}
          </Sidebar.Content>
        </Sidebar.SlidingView>

        <Sidebar.SlidingView value="domain">
          <Sidebar.Content>
            {#each sidebarNavigation.domain.sections as section (section.label ?? section.items[0]?.label)}
              {@render menuSection(section)}
            {/each}
          </Sidebar.Content>
        </Sidebar.SlidingView>
      </Sidebar.SlidingViews>

      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
