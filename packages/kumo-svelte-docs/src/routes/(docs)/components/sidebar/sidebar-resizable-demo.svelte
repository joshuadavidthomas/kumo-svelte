<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet databaseIcon()}<DatabaseIcon />{/snippet}

<DemoShell>
  <Sidebar.Provider defaultOpen resizable defaultWidth={240} minWidth={180} maxWidth={400} class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header><div class="px-3 text-sm font-semibold text-kumo-strong">Acme Inc</div></Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={homeIcon} active>Home</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={chartIcon}>Analytics</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={databaseIcon}>Storage</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer><Sidebar.Trigger /></Sidebar.Footer>
      <Sidebar.ResizeHandle />
    </Sidebar.Root>
    <DemoMain><p class="text-sm">Drag the sidebar edge to resize</p></DemoMain>
  </Sidebar.Provider>
</DemoShell>
