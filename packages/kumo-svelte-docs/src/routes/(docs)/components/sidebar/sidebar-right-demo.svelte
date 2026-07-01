<script lang="ts">
  import BellIcon from "phosphor-svelte/lib/BellIcon";
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
  }

  const detailItems: MenuItem[] = [
    { label: "Properties", icon: GearIcon, active: true },
    { label: "Metrics", icon: ChartBarIcon },
    { label: "Alerts", icon: BellIcon },
  ];
</script>

<DemoShell>
  <Sidebar.Provider contained defaultOpen side="right" class="h-full min-h-0!">
    <DemoMain />
    <Sidebar.Root>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Details</Sidebar.GroupLabel>
          <Sidebar.Menu>
            {#each detailItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  </Sidebar.Provider>
</DemoShell>
