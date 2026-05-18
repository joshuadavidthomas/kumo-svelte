<script lang="ts">
  import DocPage from "$docs/doc-page.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<DocPage page={data.page} />
