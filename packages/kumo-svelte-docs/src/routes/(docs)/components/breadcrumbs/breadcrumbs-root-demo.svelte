<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

<Breadcrumbs.Root>
  <Breadcrumbs.Current>
    {#snippet icon()}
      <HouseIcon size={16} />
    {/snippet}

    Worker Analytics
  </Breadcrumbs.Current>
</Breadcrumbs.Root>
