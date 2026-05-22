<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import { useSidebar } from "kumo-svelte/components/sidebar";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet chartIcon()}<ChartBarIcon />{/snippet}
{#snippet codeIcon()}<CodeIcon />{/snippet}
{#snippet databaseIcon()}<DatabaseIcon />{/snippet}

{#snippet toggleButton()}
  {@const sidebar = useSidebar("ToggleButton")}
  <button
    type="button"
    onclick={sidebar.toggleSidebar}
    class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-1.5 text-sm text-kumo-default transition-colors hover:bg-kumo-tint"
  >
    {sidebar.state === "expanded" ? "Collapse" : "Expand"}
  </button>
{/snippet}

<DemoShell>
  <Sidebar.Provider defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Header>
        <div class="flex w-full min-w-0 items-center gap-2 px-3 group-data-[state=collapsed]/sidebar:px-2">
          <div class="size-4 shrink-0 rounded bg-kumo-brand"></div>
          <span class="truncate text-sm font-semibold text-kumo-strong group-data-[state=collapsed]/sidebar:hidden">Acme Inc</span>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={homeIcon} tooltip="Home" active>Home</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={chartIcon} tooltip="Analytics">Analytics</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={codeIcon} tooltip="Compute">Compute</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={databaseIcon} tooltip="Storage">Storage</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
    </Sidebar.Root>
    <DemoMain>
      {@render toggleButton()}
      <p class="text-sm">Click the button or the sidebar trigger to toggle</p>
    </DemoMain>
  </Sidebar.Provider>
</DemoShell>
