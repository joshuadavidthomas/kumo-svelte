<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import type { Component } from "svelte";
  import { useSidebar } from "kumo-svelte/components/sidebar";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import BrandLogo from "./sidebar-brand-logo.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
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
      label: "Build",
      items: [
        { label: "Compute", icon: CodeIcon },
        { label: "Storage", icon: DatabaseIcon },
      ],
    },
  ];
</script>

{#snippet mobileToggleButton()}
  {@const sidebar = useSidebar("MobileToggleButton")}
  <button
    type="button"
    onclick={sidebar.toggleSidebar}
    class="cursor-pointer rounded-lg border border-kumo-line bg-kumo-base px-3 py-1.5 text-base text-kumo-default transition-colors hover:bg-kumo-tint"
  >
    {sidebar.openMobile ? "Close sidebar" : "Open sidebar"}
  </button>
{/snippet}

<div class="relative h-[540px] w-full overflow-hidden rounded-lg border border-kumo-line bg-kumo-base">
  <Sidebar.Provider contained mobileBreakpoint={9999} class="h-full">
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
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain>
      {@render mobileToggleButton()}
      <p>Click the button to open the mobile sidebar</p>
      <p class="text-sm text-kumo-subtle">Press Escape or click the backdrop to close</p>
    </DemoMain>
  </Sidebar.Provider>
</div>
