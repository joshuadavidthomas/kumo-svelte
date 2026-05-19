<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsClipboard,
    BreadcrumbsCurrent,
    BreadcrumbsLink,
    BreadcrumbsSeparator,
  } from "kumo-svelte";
</script>

<Breadcrumbs>
  <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Breadcrumbs</BreadcrumbsCurrent>
  <BreadcrumbsClipboard text="#" />
</Breadcrumbs>
