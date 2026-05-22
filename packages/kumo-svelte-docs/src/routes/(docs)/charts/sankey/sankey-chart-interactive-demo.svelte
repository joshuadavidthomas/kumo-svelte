<script lang="ts">
  import { SankeyChart } from "kumo-svelte/components/chart";
  import { echarts } from "../chart-echarts";
  import { sankeyLinks, sankeyNodes } from "../chart-data";

  let clicked = $state("Click a node or link");
</script>

<div class="space-y-3">
  <SankeyChart
    {echarts}
    nodes={sankeyNodes}
    links={sankeyLinks}
    height={300}
    onNodeClick={(node) => (clicked = `Node: ${node.name}`)}
    onLinkClick={(link) => (clicked = `Link: ${link.source} → ${link.target}`)}
  />
  <p class="text-sm text-kumo-subtle">{clicked}</p>
</div>
