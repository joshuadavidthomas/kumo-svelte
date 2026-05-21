<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsCurrent,
    BreadcrumbsEllipsis,
    BreadcrumbsLink,
    BreadcrumbsSeparator,
  } from "kumo-svelte";
</script>

{#snippet mobileBreadcrumbs()}
  <BreadcrumbsEllipsis />
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Docs</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Breadcrumbs</BreadcrumbsCurrent>
{/snippet}

<Breadcrumbs mobileChildren={mobileBreadcrumbs}>
  <BreadcrumbsLink href="#">Home</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Docs</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Breadcrumbs</BreadcrumbsCurrent>
</Breadcrumbs>
