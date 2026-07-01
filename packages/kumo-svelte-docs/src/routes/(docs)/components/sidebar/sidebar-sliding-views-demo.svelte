<script lang="ts">
  import ArrowsLeftRightIcon from "phosphor-svelte/lib/ArrowsLeftRightIcon";
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import UserIcon from "phosphor-svelte/lib/UserIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  type SidebarSurface = "account" | "zone";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
  }

  const accountItems: MenuItem[] = [
    { label: "Home", icon: HouseIcon, active: true },
    { label: "Members", icon: UserIcon },
    { label: "Analytics", icon: ChartBarIcon },
    { label: "Settings", icon: GearIcon },
  ];

  const zoneItems: MenuItem[] = [
    { label: "Overview", icon: GlobeIcon, active: true },
    { label: "Security", icon: ShieldCheckIcon },
    { label: "SSL/TLS", icon: LockIcon },
    { label: "Caching", icon: DatabaseIcon },
  ];

  let surface = $state<SidebarSurface>("account");
</script>

<DemoShell>
  <Sidebar.Provider contained defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <button
          type="button"
          onclick={() => (surface = surface === "account" ? "zone" : "account")}
          class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-kumo-default transition-colors hover:bg-kumo-tint"
        >
          <ArrowsLeftRightIcon class="size-4 shrink-0 text-kumo-brand" />
          <span class="flex-1 text-left font-semibold text-kumo-strong">
            {surface === "account" ? "Account Nav" : "Zone Nav"}
          </span>
        </button>
      </Sidebar.Header>

      <Sidebar.SlidingViews activeKey={surface} direction={surface === "zone" ? "left" : "right"}>
        <Sidebar.SlidingView value="account">
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Account</Sidebar.GroupLabel>
              <Sidebar.Menu>
                {#each accountItems as item (item.label)}
                  {@const Icon = item.icon}
                  <Sidebar.MenuButton active={item.active}>
                    {#snippet icon()}<Icon />{/snippet}
                    {item.label}
                  </Sidebar.MenuButton>
                {/each}
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.SlidingView>

        <Sidebar.SlidingView value="zone">
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Zone</Sidebar.GroupLabel>
              <Sidebar.Menu>
                {#each zoneItems as item (item.label)}
                  {@const Icon = item.icon}
                  <Sidebar.MenuButton active={item.active}>
                    {#snippet icon()}<Icon />{/snippet}
                    {item.label}
                  </Sidebar.MenuButton>
                {/each}
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.SlidingView>
      </Sidebar.SlidingViews>
    </Sidebar.Root>

    <DemoMain>
      <div class="flex flex-col items-center gap-2">
        <p class="font-medium text-kumo-default">
          Active: {surface === "account" ? "Account" : "Zone"} surface
        </p>
        <p>Click the header button to slide between views</p>
      </div>
    </DemoMain>
  </Sidebar.Provider>
</DemoShell>
