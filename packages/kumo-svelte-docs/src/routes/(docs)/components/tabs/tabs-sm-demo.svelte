<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";
</script>

<div class="flex flex-col gap-6">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Segmented sm</p>
    <Tabs.Root variant="segmented" size="sm" value="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Underline sm</p>
    <Tabs.Root variant="underline" size="sm" value="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>
</div>
