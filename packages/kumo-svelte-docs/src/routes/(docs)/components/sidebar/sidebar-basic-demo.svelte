<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet globeIcon()}<GlobeIcon />{/snippet}
{#snippet codeIcon()}<CodeIcon />{/snippet}
{#snippet databaseIcon()}<DatabaseIcon />{/snippet}

<DemoShell>
  <Sidebar.Provider defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={homeIcon} active>Home</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={chartIcon}>Analytics</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={globeIcon}>Domains</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>

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
                  </Sidebar.MenuSub>
                </Sidebar.CollapsibleContent>
              </Sidebar.Collapsible>
            </Sidebar.MenuItem>
            <Sidebar.MenuButton icon={databaseIcon}>Storage</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
