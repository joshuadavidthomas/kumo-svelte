<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider,
  } from "kumo-svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet globeIcon()}<GlobeIcon />{/snippet}
{#snippet codeIcon()}<CodeIcon />{/snippet}
{#snippet databaseIcon()}<DatabaseIcon />{/snippet}
{#snippet shieldIcon()}<ShieldCheckIcon />{/snippet}
{#snippet lockIcon()}<LockIcon />{/snippet}

<DemoShell>
  <SidebarProvider defaultOpen class="h-full min-h-0!">
    <Sidebar>
      <SidebarContent>
        <SidebarGroup collapsible defaultOpen>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton icon={homeIcon} active>Home</SidebarMenuButton>
              <SidebarMenuButton icon={chartIcon}>Analytics</SidebarMenuButton>
              <SidebarMenuButton icon={globeIcon}>Domains</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup collapsible defaultOpen>
          <SidebarGroupLabel>Build</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton icon={codeIcon}>Compute</SidebarMenuButton>
              <SidebarMenuButton icon={databaseIcon}>Storage</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup collapsible defaultOpen={false}>
          <SidebarGroupLabel>Protect & Connect</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton icon={shieldIcon}>Security</SidebarMenuButton>
              <SidebarMenuButton icon={lockIcon}>Zero Trust</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <DemoMain />
  </SidebarProvider>
</DemoShell>
