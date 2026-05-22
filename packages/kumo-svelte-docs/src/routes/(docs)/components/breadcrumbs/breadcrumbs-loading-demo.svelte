<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
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

<Breadcrumbs mobileChildren={mobileBreadcrumbs}>
  <Breadcrumbs.Link href="#" icon={homeIcon}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs>
