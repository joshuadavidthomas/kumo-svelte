<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="relative h-[540px] w-full overflow-hidden rounded-lg border border-kumo-hairline bg-kumo-base">
  {@render children()}
</div>
