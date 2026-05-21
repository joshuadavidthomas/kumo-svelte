<script lang="ts">
  import { Breadcrumbs, BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator } from "kumo-svelte";
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
      <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      <BreadcrumbsSeparator />
      <BreadcrumbsCurrent>Settings</BreadcrumbsCurrent>
    </Breadcrumbs>
  {/snippet}
</PageHeaderDemoShell>
