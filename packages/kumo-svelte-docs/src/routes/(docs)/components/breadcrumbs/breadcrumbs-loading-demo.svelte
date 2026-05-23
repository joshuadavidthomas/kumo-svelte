<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

<Breadcrumbs.Root>
  {#snippet mobile()}
    <Breadcrumbs.Ellipsis />
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current loading />
  {/snippet}

  <Breadcrumbs.Link href="#">
    {#snippet icon()}
      <HouseIcon size={16} />
    {/snippet}

    Home
  </Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs.Root>
