<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
</script>

<Breadcrumbs.Root>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
  <Breadcrumbs.Clipboard text="#" />
</Breadcrumbs.Root>
