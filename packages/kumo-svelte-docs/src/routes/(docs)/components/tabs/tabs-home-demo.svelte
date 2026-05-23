<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";
</script>

<Tabs.Root value="home">
  <Tabs.List>
    <Tabs.Trigger value="home">Home</Tabs.Trigger>
    <Tabs.Trigger value="about">About</Tabs.Trigger>
    <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
