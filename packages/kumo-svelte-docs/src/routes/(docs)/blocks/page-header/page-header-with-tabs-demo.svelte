<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";

  const tabs = [
    { label: "General", value: "general" },
    { label: "Security", value: "security" },
    { label: "Notifications", value: "notifications" },
  ];
</script>

<PageHeaderDemoShell {tabs} selectedValue="general">
  {#snippet breadcrumbs()}
    <Breadcrumbs.Root>
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
    </Breadcrumbs.Root>
  {/snippet}
</PageHeaderDemoShell>
