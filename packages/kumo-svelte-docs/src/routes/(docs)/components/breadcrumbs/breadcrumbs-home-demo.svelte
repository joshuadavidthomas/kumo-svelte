<script lang="ts">
  import * as Breadcrumbs from "kumo-svelte/components/breadcrumbs";
</script>

<Breadcrumbs.Root class="mr-0 h-auto grow-0 gap-1 text-sm">
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
  <Breadcrumbs.Current>Page</Breadcrumbs.Current>
</Breadcrumbs.Root>
