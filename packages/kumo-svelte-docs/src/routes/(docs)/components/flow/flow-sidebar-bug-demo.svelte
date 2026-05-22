<script lang="ts">
  import SidebarSimpleIcon from "phosphor-svelte/lib/SidebarSimpleIcon";
  import * as Flow from "kumo-svelte/components/flow";
  const navItems = ["Overview", "Settings", "Logs", "Analytics"];

  let sidebarOpen = $state(true);
</script>

<div class="relative flex min-h-64 flex-col overflow-hidden rounded-lg bg-kumo-base ring ring-kumo-hairline">
  <div class="flex shrink-0 items-center gap-2 border-b border-kumo-hairline px-3 py-2">
    <button
      type="button"
      class="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-kumo-default transition-colors hover:bg-kumo-elevated"
      onclick={() => (sidebarOpen = !sidebarOpen)}
    >
      <SidebarSimpleIcon class="size-4" />
      {sidebarOpen ? "Close sidebar" : "Open sidebar"}
    </button>
    <span class="text-xs text-kumo-subtle">Toggle the sidebar — connectors should stay aligned</span>
  </div>

  <div class="flex min-h-0 flex-1">
    <div
      class="shrink-0 overflow-hidden border-r border-kumo-hairline bg-kumo-elevated transition-[width] duration-300"
      style:width={sidebarOpen ? "160px" : "0px"}
    >
      <div class="w-40 space-y-1 p-3">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-kumo-subtle">Sidebar</p>
        {#each navItems as item}
          <div class="cursor-default rounded px-2 py-1 text-sm text-kumo-default hover:bg-kumo-base">
            {item}
          </div>
        {/each}
      </div>
    </div>

    <div class="h-48 flex-1 overflow-auto p-4">
      <Flow.Root>
        <Flow.Node>HTTP Request</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Auth Check</Flow.Node>
          <Flow.Node>Rate Limit</Flow.Node>
          <Flow.Node>Cache Lookup</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>Route Handler</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Log</Flow.Node>
          <Flow.Node>Respond</Flow.Node>
        </Flow.Parallel>
      </Flow.Root>
    </div>
  </div>
</div>
