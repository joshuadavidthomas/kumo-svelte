<script lang="ts">
  import { Breadcrumbs } from "kumo-svelte";
</script>

<Breadcrumbs class="mr-0 h-auto grow-0 gap-1 text-sm">
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
  <Breadcrumbs.Current>Page</Breadcrumbs.Current>
</Breadcrumbs>
