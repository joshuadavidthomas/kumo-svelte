<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsCurrent,
    BreadcrumbsEllipsis,
    BreadcrumbsLink,
    BreadcrumbsSeparator,
  } from "kumo-svelte";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

{#snippet mobileBreadcrumbs()}
  <BreadcrumbsEllipsis />
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Projects</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Current Project</BreadcrumbsCurrent>
{/snippet}

<Breadcrumbs mobileChildren={mobileBreadcrumbs}>
  <BreadcrumbsLink href="#" icon={homeIcon}>Home</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Projects</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Current Project</BreadcrumbsCurrent>
</Breadcrumbs>
