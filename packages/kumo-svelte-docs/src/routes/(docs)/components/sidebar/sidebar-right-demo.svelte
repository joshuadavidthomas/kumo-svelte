<script lang="ts">
  import BellIcon from "phosphor-svelte/lib/BellIcon";
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import { Sidebar } from "kumo-svelte";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet gearIcon()}<GearIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet bellIcon()}<BellIcon />{/snippet}

<DemoShell>
  <Sidebar.Provider defaultOpen side="right" class="h-full min-h-0!">
    <DemoMain />
    <Sidebar>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Details</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={gearIcon} active>Properties</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={chartIcon}>Metrics</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={bellIcon}>Alerts</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar>
  </Sidebar.Provider>
</DemoShell>
