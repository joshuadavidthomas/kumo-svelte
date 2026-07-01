<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
  }

  const overviewItems: MenuItem[] = [
    { label: "Home", icon: HouseIcon, active: true },
    { label: "Analytics", icon: ChartBarIcon },
    { label: "Domains", icon: GlobeIcon },
  ];

  const buildItems: MenuItem[] = [
    { label: "Compute", icon: CodeIcon },
    { label: "Storage", icon: DatabaseIcon },
  ];

  const protectItems: MenuItem[] = [
    { label: "Security", icon: ShieldCheckIcon },
    { label: "Zero Trust", icon: LockIcon },
  ];
</script>

<DemoShell>
  <Sidebar.Provider contained defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            {#each overviewItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group collapsible defaultOpen>
          <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {#each buildItems as item (item.label)}
                {@const Icon = item.icon}
                <Sidebar.MenuButton>
                  {#snippet icon()}<Icon />{/snippet}
                  {item.label}
                </Sidebar.MenuButton>
              {/each}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Group collapsible defaultOpen={false}>
          <Sidebar.GroupLabel>Protect & Connect</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {#each protectItems as item (item.label)}
                {@const Icon = item.icon}
                <Sidebar.MenuButton>
                  {#snippet icon()}<Icon />{/snippet}
                  {item.label}
                </Sidebar.MenuButton>
              {/each}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
