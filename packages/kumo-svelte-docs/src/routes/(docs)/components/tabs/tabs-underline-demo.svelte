<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";
</script>

<Tabs.Root variant="underline" value="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
