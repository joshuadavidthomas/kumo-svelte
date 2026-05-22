<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

<Breadcrumbs.Root>
  <Breadcrumbs.Current icon={homeIcon}>Worker Analytics</Breadcrumbs.Current>
</Breadcrumbs.Root>
