<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";
  let activeTab = $state("tab1");
</script>

<div class="space-y-4">
  <Tabs.Root bind:value={activeTab}>
    <Tabs.List>
      <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
  <p class="text-sm text-kumo-subtle">Active tab: <code class="text-sm">{activeTab}</code></p>
</div>
