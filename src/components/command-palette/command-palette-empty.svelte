<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command as CommandPrimitive } from "bits-ui";

  export interface CommandPaletteEmptyProps {
    children?: Snippet;
    forceMount?: boolean;
  }

  let {
    children,
    forceMount,
  }: CommandPaletteEmptyProps = $props();
</script>

<CommandPrimitive.Empty {forceMount}>
  <div class="p-8 text-center">
    <p class="text-kumo-subtle">
      {#if children}
        {@render children()}
      {:else}
        No results found
      {/if}
    </p>
  </div>
</CommandPrimitive.Empty>
