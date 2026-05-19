<script lang="ts">
  import { Breadcrumbs, BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator } from "kumo-svelte";
  import PageHeaderDemoShell from "./page-header-demo-shell.svelte";
</script>

<PageHeaderDemoShell>
  {#snippet breadcrumbs()}
    <Breadcrumbs>
      <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
      <BreadcrumbsSeparator />
      <BreadcrumbsCurrent>Dashboard</BreadcrumbsCurrent>
    </Breadcrumbs>
  {/snippet}
</PageHeaderDemoShell>
