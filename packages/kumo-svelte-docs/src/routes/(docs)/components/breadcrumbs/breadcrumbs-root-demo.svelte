<script lang="ts">
  import { Breadcrumbs, BreadcrumbsCurrent } from "kumo-svelte";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

<Breadcrumbs>
  <BreadcrumbsCurrent icon={homeIcon}>Worker Analytics</BreadcrumbsCurrent>
</Breadcrumbs>
