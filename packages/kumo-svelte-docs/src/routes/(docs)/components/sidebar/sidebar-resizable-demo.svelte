<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider,
    SidebarResizeHandle,
    SidebarTrigger,
  } from "kumo-svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet databaseIcon()}<DatabaseIcon />{/snippet}

<DemoShell>
  <SidebarProvider defaultOpen resizable defaultWidth={240} minWidth={180} maxWidth={400} class="h-full min-h-0!">
    <Sidebar>
      <SidebarHeader><div class="px-3 text-sm font-semibold text-kumo-strong">Acme Inc</div></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton icon={homeIcon} active>Home</SidebarMenuButton>
            <SidebarMenuButton icon={chartIcon}>Analytics</SidebarMenuButton>
            <SidebarMenuButton icon={databaseIcon}>Storage</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter><SidebarTrigger /></SidebarFooter>
      <SidebarResizeHandle />
    </Sidebar>
    <DemoMain><p class="text-sm">Drag the sidebar edge to resize</p></DemoMain>
  </SidebarProvider>
</DemoShell>
