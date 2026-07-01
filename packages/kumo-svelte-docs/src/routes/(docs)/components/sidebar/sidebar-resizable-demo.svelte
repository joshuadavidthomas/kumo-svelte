<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import BrandLogo from "./sidebar-brand-logo.svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
  }

  const menuItems: MenuItem[] = [
    { label: "Home", icon: HouseIcon, active: true },
    { label: "Analytics", icon: ChartBarIcon },
    { label: "Storage", icon: DatabaseIcon },
  ];
</script>

<DemoShell>
  <Sidebar.Provider contained defaultOpen resizable defaultWidth={240} minWidth={180} maxWidth={400} class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <BrandLogo />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            {#each menuItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer><Sidebar.Trigger /></Sidebar.Footer>
      <Sidebar.ResizeHandle />
    </Sidebar.Root>
    <DemoMain><p class="text-sm">Drag the sidebar edge to resize</p></DemoMain>
  </Sidebar.Provider>
</DemoShell>
