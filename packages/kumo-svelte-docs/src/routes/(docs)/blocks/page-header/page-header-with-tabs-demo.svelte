<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";

  const tabs = [
    { label: "General", value: "general" },
    { label: "Security", value: "security" },
    { label: "Notifications", value: "notifications" },
  ];
</script>

<PageHeaderDemoShell {tabs} selectedValue="general">
  {#snippet breadcrumbs()}
    <Breadcrumbs>
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
    </Breadcrumbs>
  {/snippet}
</PageHeaderDemoShell>
