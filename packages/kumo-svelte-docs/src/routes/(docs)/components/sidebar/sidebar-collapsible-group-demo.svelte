<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import LockIcon from "phosphor-svelte/lib/LockIcon";
  import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
  import { Sidebar } from "kumo-svelte";
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
  <Sidebar.Provider defaultOpen class="h-full min-h-0!">
    <Sidebar>
      <Sidebar.Content>
        <Sidebar.Group collapsible defaultOpen>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={homeIcon} active>Home</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={chartIcon}>Analytics</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={globeIcon}>Domains</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Group collapsible defaultOpen>
          <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={codeIcon}>Compute</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={databaseIcon}>Storage</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Group collapsible defaultOpen={false}>
          <Sidebar.GroupLabel>Protect & Connect</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={shieldIcon}>Security</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={lockIcon}>Zero Trust</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
