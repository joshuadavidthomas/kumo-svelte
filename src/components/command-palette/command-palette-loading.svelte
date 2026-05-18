<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";
  import Loader from "../loader/loader.svelte";

  export interface CommandPaletteLoadingProps {
    children?: Snippet;
    progress?: number;
  }

  let {
    children,
    progress,
  }: CommandPaletteLoadingProps = $props();
</script>

<CommandPrimitive.Loading data-slot="command-palette-loading" {progress}>
  <div data-slot="command-palette-loading-content" class="flex items-center justify-center p-8">
    {#if children}
      {@render children()}
    {:else}
      <Loader size={24} />
    {/if}
  </div>
</CommandPrimitive.Loading>
