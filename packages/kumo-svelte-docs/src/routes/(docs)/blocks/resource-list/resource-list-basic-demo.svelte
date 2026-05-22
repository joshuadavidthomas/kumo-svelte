<script lang="ts">
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import { Surface } from "kumo-svelte/components/surface";
  import ResourceListDemoShell from "./resource-list-demo-shell.svelte";
</script>

<ResourceListDemoShell title="Databases" description="Manage your database instances and configurations">
  {#snippet icon()}
    <DatabaseIcon class="size-8 text-kumo-subtle" />
  {/snippet}
  <Surface class="p-6">
    <p>Main content area — your resource list would go here.</p>
  </Surface>
</ResourceListDemoShell>
