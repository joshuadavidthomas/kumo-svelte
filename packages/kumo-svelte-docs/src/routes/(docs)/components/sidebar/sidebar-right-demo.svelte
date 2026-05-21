<script lang="ts">
  import BellIcon from "phosphor-svelte/lib/BellIcon";
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider,
  } from "kumo-svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet gearIcon()}<GearIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet bellIcon()}<BellIcon />{/snippet}

<DemoShell>
  <SidebarProvider defaultOpen side="right" class="h-full min-h-0!">
    <DemoMain />
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Details</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton icon={gearIcon} active>Properties</SidebarMenuButton>
            <SidebarMenuButton icon={chartIcon}>Metrics</SidebarMenuButton>
            <SidebarMenuButton icon={bellIcon}>Alerts</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</DemoShell>
