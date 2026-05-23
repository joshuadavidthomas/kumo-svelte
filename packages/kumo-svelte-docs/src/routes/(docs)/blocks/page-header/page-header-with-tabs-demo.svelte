<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import * as Tabs from "kumo-svelte/components/tabs";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";
</script>

<PageHeaderDemoShell>
  {#snippet breadcrumbs()}
    <Breadcrumbs.Root>
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
    </Breadcrumbs.Root>
  {/snippet}
  {#snippet tabs()}
    <Tabs.Root value="general">
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  {/snippet}
</PageHeaderDemoShell>
