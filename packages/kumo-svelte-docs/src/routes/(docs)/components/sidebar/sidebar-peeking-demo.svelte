<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import type { Component } from "svelte";
  import { useSidebar } from "kumo-svelte/components/sidebar";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import BrandLogo from "./sidebar-brand-logo.svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
    tooltip: string;
  }

  const menuItems: MenuItem[] = [
    { label: "Home", tooltip: "Home", icon: HouseIcon, active: true },
    { label: "Analytics", tooltip: "Analytics", icon: ChartBarIcon },
    { label: "Compute", tooltip: "Compute", icon: CodeIcon },
    { label: "Storage", tooltip: "Storage", icon: DatabaseIcon },
  ];

  const labels = {
    collapsed: "Collapsed",
    expanded: "Expanded",
    peeking: "Peeking",
  };
</script>

{#snippet peekStateIndicator()}
  {@const sidebar = useSidebar("PeekStateIndicator")}
  <div class="flex flex-col items-center gap-2">
    <span class="font-medium text-kumo-default">State: {labels[sidebar.state]}</span>
    <p>Collapse, then hover the sidebar to peek</p>
  </div>
{/snippet}

<DemoShell>
  <Sidebar.Provider contained defaultOpen peekable class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <BrandLogo />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            {#each menuItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active} tooltip={item.tooltip}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain>
      {@render peekStateIndicator()}
    </DemoMain>
  </Sidebar.Provider>
</DemoShell>
