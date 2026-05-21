<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Breadcrumbs, BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator, Button } from "kumo-svelte";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Analytics", value: "analytics" },
    { label: "Settings", value: "settings" },
  ];
</script>

<PageHeaderDemoShell
  title="Page title"
  description="Action-led, value-oriented description of what this page does."
  {tabs}
  selectedValue="overview"
>
  {#snippet breadcrumbs()}
    <Breadcrumbs>
      <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      <BreadcrumbsSeparator />
      <BreadcrumbsLink href="#">Products</BreadcrumbsLink>
      <BreadcrumbsSeparator />
      <BreadcrumbsCurrent>Page title</BreadcrumbsCurrent>
    </Breadcrumbs>
  {/snippet}
  {#snippet actions()}
    <Button variant="outline" size="sm">Export</Button>
    <Button variant="primary" size="sm">
      <PlusIcon class="size-4" />
      New Item
    </Button>
  {/snippet}
</PageHeaderDemoShell>
