<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import {
    Sidebar,
    SidebarCollapsible,
    SidebarCollapsibleContent,
    SidebarCollapsibleTrigger,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuChevron,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarProvider,
    SidebarSeparator,
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
{#snippet gearIcon()}<GearIcon />{/snippet}

<DemoShell>
  <SidebarProvider defaultOpen class="h-full min-h-0!">
    <Sidebar>
      <SidebarHeader>
        <div class="flex w-full min-w-0 items-center gap-2 px-3 py-2">
          <div class="size-4 shrink-0 rounded bg-kumo-brand"></div>
          <span class="truncate text-sm font-semibold text-kumo-strong group-data-[state=collapsed]/sidebar:hidden">Acme Inc</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div class="px-1 pb-2"><SidebarInput placeholder="Quick search..." shortcut="⌘K" /></div>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton icon={homeIcon} active>Home</SidebarMenuButton>
            <SidebarMenuButton icon={chartIcon}>Analytics & Logs</SidebarMenuButton>
            <SidebarMenuButton icon={globeIcon}>Domains</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
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
                    <SidebarMenuSubButton>Containers <SidebarMenuBadge>Beta</SidebarMenuBadge></SidebarMenuSubButton>
                  </SidebarMenuSub>
                </SidebarCollapsibleContent>
              </SidebarCollapsible>
            </SidebarMenuItem>
            <SidebarMenuButton icon={databaseIcon}>Storage</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Protect & Connect</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton icon={shieldIcon}>Security</SidebarMenuButton>
            <SidebarMenuButton icon={lockIcon}>Zero Trust <SidebarMenuBadge>Beta</SidebarMenuBadge></SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton icon={gearIcon}>Manage account</SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
    <DemoMain />
  </SidebarProvider>
</DemoShell>
