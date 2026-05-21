<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<main class="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-kumo-subtle">
  {#if children}
    {@render children()}
  {:else}
    Main content area
  {/if}
</main>
