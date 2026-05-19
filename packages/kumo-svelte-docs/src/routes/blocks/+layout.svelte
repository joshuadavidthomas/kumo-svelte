<script lang="ts">
  import DocLayout from "$lib/components/doc-layout.svelte";

  let { children, data } = $props();
</script>

<DocLayout {data}>
  {@render children()}
</DocLayout>
