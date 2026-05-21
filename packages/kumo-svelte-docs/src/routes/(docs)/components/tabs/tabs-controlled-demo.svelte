<script lang="ts">
  import { Tabs } from "kumo-svelte";

  let activeTab = $state("tab1");
  const tabs = [
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3" },
  ];
</script>

<div class="space-y-4">
  <Tabs {tabs} value={activeTab} onValueChange={(value) => (activeTab = value)} />
  <p class="text-sm text-kumo-subtle">Active tab: <code class="text-sm">{activeTab}</code></p>
</div>
