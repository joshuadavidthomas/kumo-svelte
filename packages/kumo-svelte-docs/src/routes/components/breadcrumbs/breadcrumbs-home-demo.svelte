<script lang="ts">
  import { Breadcrumbs, BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator } from "kumo-svelte";
</script>

<Breadcrumbs>
  <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Docs</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Page</BreadcrumbsCurrent>
</Breadcrumbs>
