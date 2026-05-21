<script lang="ts">
  import { Breadcrumbs, BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator } from "kumo-svelte";
</script>

<Breadcrumbs class="mr-0 h-auto grow-0 gap-1 text-sm">
  <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
  <BreadcrumbsSeparator>/</BreadcrumbsSeparator>
  <BreadcrumbsLink href="#">Docs</BreadcrumbsLink>
  <BreadcrumbsSeparator>/</BreadcrumbsSeparator>
  <BreadcrumbsCurrent>Page</BreadcrumbsCurrent>
</Breadcrumbs>
