<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import {
    Sidebar,
    SidebarCollapsible,
    SidebarCollapsibleContent,
    SidebarCollapsibleTrigger,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuChevron,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
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

<DemoShell>
  <SidebarProvider defaultOpen class="h-full min-h-0!">
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton icon={homeIcon} active>Home</SidebarMenuButton>
            <SidebarMenuButton icon={chartIcon}>Analytics</SidebarMenuButton>
            <SidebarMenuButton icon={globeIcon}>Domains</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Build</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarCollapsible open>
                <SidebarCollapsibleTrigger>
                  {#snippet child({ props })}
                    <SidebarMenuButton {...props} icon={codeIcon}>Compute <SidebarMenuChevron /></SidebarMenuButton>
                  {/snippet}
                </SidebarCollapsibleTrigger>
                <SidebarCollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton>Workers & Pages</SidebarMenuSubButton>
                    <SidebarMenuSubButton>Durable Objects</SidebarMenuSubButton>
                  </SidebarMenuSub>
                </SidebarCollapsibleContent>
              </SidebarCollapsible>
            </SidebarMenuItem>
            <SidebarMenuButton icon={databaseIcon}>Storage</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <DemoMain />
  </SidebarProvider>
</DemoShell>
