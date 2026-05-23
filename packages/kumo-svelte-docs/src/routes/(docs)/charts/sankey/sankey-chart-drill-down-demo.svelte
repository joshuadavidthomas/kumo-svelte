<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { SankeyChart, ChartPalette } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";

  const sankeyLinks = [
    { source: 0, target: 2, value: 80000 },
    { source: 0, target: 3, value: 23600 },
    { source: 1, target: 2, value: 42600 },
    { source: 1, target: 3, value: 8200 },
  ];

  const sankeyNodes = [
    { name: "Users", value: 103600, color: ChartPalette.categorical(0) },
    { name: "Devices", value: 50800, color: ChartPalette.categorical(1) },
    { name: "Apps", value: 122600, color: ChartPalette.categorical(2) },
    { name: "Tunnels", value: 31800, color: ChartPalette.categorical(3) },
  ];

  const sourceNames = new Set(["Users", "Devices"]);
  let selected = $state<string | null>(null);

  let filteredLinks = $derived(
    selected ? sankeyLinks.filter((link) => sankeyNodes[link.source]?.name === selected) : sankeyLinks,
  );
  let connectedNodeIndexes = $derived(new Set(filteredLinks.flatMap((link) => [link.source, link.target])));
  let filteredNodes = $derived(selected ? sankeyNodes.filter((_, index) => connectedNodeIndexes.has(index)) : sankeyNodes);
  let remappedLinks = $derived(
    selected
      ? filteredLinks.map((link) => ({
          ...link,
          source: filteredNodes.findIndex((node) => node.name === sankeyNodes[link.source]?.name),
          target: filteredNodes.findIndex((node) => node.name === sankeyNodes[link.target]?.name),
        }))
      : filteredLinks,
  );
</script>

<div class="space-y-3">
  <div class="flex items-center gap-2">
    <Button size="sm" variant="secondary" onclick={() => (selected = null)}>Reset</Button>
    <span class="text-sm text-kumo-subtle">{selected ? `Filtered to ${selected}` : "Click Users or Devices"}</span>
  </div>
  <SankeyChart
    {echarts}
    nodes={filteredNodes}
    links={remappedLinks}
    height={300}
    onNodeClick={(node) => {
      selected = sourceNames.has(node.name) ? (selected === node.name ? null : node.name) : selected;
    }}
  />
</div>
