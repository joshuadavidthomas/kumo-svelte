<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import { SankeyChart } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";
  import { sankeyLinks, sankeyNodes } from "../chart-data";

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
