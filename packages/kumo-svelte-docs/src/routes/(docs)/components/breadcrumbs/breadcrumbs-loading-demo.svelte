<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
</script>

{#snippet homeIcon()}
  <HouseIcon size={16} />
{/snippet}

{#snippet mobileBreadcrumbs()}
  <Breadcrumbs.Ellipsis />
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
{/snippet}

<Breadcrumbs.Root mobileChildren={mobileBreadcrumbs}>
  <Breadcrumbs.Link href="#" icon={homeIcon}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs.Root>
