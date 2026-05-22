<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
</script>

{#snippet mobileBreadcrumbs()}
  <Breadcrumbs.Ellipsis />
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
{/snippet}

<Breadcrumbs.Root mobileChildren={mobileBreadcrumbs}>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
</Breadcrumbs.Root>
