<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
</script>

{#snippet mobileBreadcrumbs()}
  <Breadcrumbs.Ellipsis />
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
{/snippet}

<Breadcrumbs mobileChildren={mobileBreadcrumbs}>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
</Breadcrumbs>
