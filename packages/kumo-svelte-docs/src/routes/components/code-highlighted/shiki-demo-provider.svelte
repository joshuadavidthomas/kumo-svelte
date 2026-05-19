<script lang="ts">
  import type { Snippet } from "svelte";
  import { ShikiProvider } from "kumo-svelte/code";

  let { children }: { children: Snippet } = $props();
</script>

<ShikiProvider
  engine="javascript"
  languages={["tsx", "typescript", "javascript", "bash", "json", "css", "html"]}
>
  {@render children()}
</ShikiProvider>
