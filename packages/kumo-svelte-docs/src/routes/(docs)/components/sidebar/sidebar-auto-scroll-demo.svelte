<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import CubeIcon from "phosphor-svelte/lib/CubeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import BrandLogo from "./sidebar-brand-logo.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    badge?: string;
    icon: Component;
    label: string;
  }

  interface Section {
    items: MenuItem[];
    label: string;
  }

  const sections: Section[] = [
    {
      label: "Overview",
      items: [
        { label: "Home", icon: HouseIcon, active: true },
        { label: "Analytics", icon: ChartBarIcon },
        { label: "Domains", icon: GlobeIcon },
      ],
    },
    {
      label: "Platform",
      items: [
        { label: "Storage", icon: DatabaseIcon },
        { label: "Security", icon: ShieldCheckIcon },
        { label: "Zero Trust", icon: LockIcon },
        { label: "Settings", icon: GearIcon },
      ],
    },
  ];

  const workerItems = ["Overview", "Deployments", "Observability", "Settings"];
  const containersItem = { label: "Containers", icon: CubeIcon, badge: "Beta" } satisfies MenuItem;
</script>

<div class="relative h-[420px] w-full overflow-hidden rounded-lg border border-kumo-line bg-kumo-base">
  <Sidebar.Provider contained defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <BrandLogo />
      </Sidebar.Header>
      <Sidebar.Content>
        {#each sections as section (section.label)}
          <Sidebar.Group>
            <Sidebar.GroupLabel>{section.label}</Sidebar.GroupLabel>
            <Sidebar.Menu>
              {#each section.items as item (item.label)}
                {@const Icon = item.icon}
                <Sidebar.MenuButton active={item.active}>
                  {#snippet icon()}<Icon />{/snippet}
                  {item.label}
                </Sidebar.MenuButton>
              {/each}
            </Sidebar.Menu>
          </Sidebar.Group>
        {/each}

        <Sidebar.Group>
          <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.Collapsible autoScrollOnOpen>
                <Sidebar.CollapsibleTrigger>
                  {#snippet child({ props })}
                    <Sidebar.MenuButton {...props}>
                      {#snippet icon()}<CodeIcon />{/snippet}
                      Workers <Sidebar.MenuChevron />
                    </Sidebar.MenuButton>
                  {/snippet}
                </Sidebar.CollapsibleTrigger>
                <Sidebar.CollapsibleContent>
                  <Sidebar.MenuSub>
                    {#each workerItems as label (label)}
                      <Sidebar.MenuSubButton>{label}</Sidebar.MenuSubButton>
                    {/each}
                  </Sidebar.MenuSub>
                </Sidebar.CollapsibleContent>
              </Sidebar.Collapsible>
            </Sidebar.MenuItem>
            <Sidebar.MenuButton>
              {#snippet icon()}<CubeIcon />{/snippet}
              {containersItem.label}
              <Sidebar.MenuBadge>{containersItem.badge}</Sidebar.MenuBadge>
            </Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain>
      <p>Open Workers near the bottom of the list</p>
    </DemoMain>
  </Sidebar.Provider>
</div>
