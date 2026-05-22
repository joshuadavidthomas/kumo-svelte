<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";
</script>

<PageHeaderDemoShell>
  {#snippet breadcrumbs()}
    <Breadcrumbs.Root>
      <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>Dashboard</Breadcrumbs.Current>
    </Breadcrumbs.Root>
  {/snippet}
</PageHeaderDemoShell>
