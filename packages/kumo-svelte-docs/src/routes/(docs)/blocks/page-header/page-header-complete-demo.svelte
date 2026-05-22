<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Breadcrumbs, Button } from "kumo-svelte";
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
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Link href="#">Products</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Page title</Breadcrumbs.Current>
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
