<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import * as Sidebar from "kumo-svelte/components/sidebar";
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
  <Sidebar.Provider defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <div class="flex w-full min-w-0 items-center gap-2 px-3 py-2">
          <div class="size-4 shrink-0 rounded bg-kumo-brand"></div>
          <span class="truncate text-sm font-semibold text-kumo-strong group-data-[state=collapsed]/sidebar:hidden">Acme Inc</span>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <div class="px-1 pb-2"><Sidebar.Input placeholder="Quick search..." shortcut="⌘K" /></div>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={homeIcon} active>Home</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={chartIcon}>Analytics & Logs</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={globeIcon}>Domains</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Separator />
        <Sidebar.Group>
          <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.Collapsible open>
                <Sidebar.CollapsibleTrigger>
                  {#snippet child({ props })}
                    <Sidebar.MenuButton {...props} icon={codeIcon}>Compute <Sidebar.MenuChevron /></Sidebar.MenuButton>
                  {/snippet}
                </Sidebar.CollapsibleTrigger>
                <Sidebar.CollapsibleContent>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubButton>Workers & Pages</Sidebar.MenuSubButton>
                    <Sidebar.MenuSubButton>Durable Objects</Sidebar.MenuSubButton>
                    <Sidebar.MenuSubButton>Containers <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge></Sidebar.MenuSubButton>
                  </Sidebar.MenuSub>
                </Sidebar.CollapsibleContent>
              </Sidebar.Collapsible>
            </Sidebar.MenuItem>
            <Sidebar.MenuButton icon={databaseIcon}>Storage</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Protect & Connect</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={shieldIcon}>Security</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={lockIcon}>Zero Trust <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge></Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.MenuButton icon={gearIcon}>Manage account</Sidebar.MenuButton>
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
