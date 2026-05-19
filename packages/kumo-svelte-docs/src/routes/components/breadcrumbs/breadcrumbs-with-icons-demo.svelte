<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsCurrent,
    BreadcrumbsLink,
    BreadcrumbsSeparator,
  } from "kumo-svelte";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

<Breadcrumbs>
  <BreadcrumbsLink href="#" icon={homeIcon}>Home</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsLink href="#">Projects</BreadcrumbsLink>
  <BreadcrumbsSeparator />
  <BreadcrumbsCurrent>Current Project</BreadcrumbsCurrent>
</Breadcrumbs>
