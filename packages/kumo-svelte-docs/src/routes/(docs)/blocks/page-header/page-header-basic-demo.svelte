<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";
</script>

<PageHeaderDemoShell>
  {#snippet breadcrumbs()}
    <Breadcrumbs>
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Dashboard</Breadcrumbs.Current>
    </Breadcrumbs>
  {/snippet}
</PageHeaderDemoShell>
