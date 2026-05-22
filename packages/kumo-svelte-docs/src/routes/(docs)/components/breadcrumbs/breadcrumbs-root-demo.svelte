<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

<Breadcrumbs>
  <Breadcrumbs.Current icon={homeIcon}>Worker Analytics</Breadcrumbs.Current>
</Breadcrumbs>
