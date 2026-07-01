<script lang="ts">
  import GearIcon from "phosphor-svelte/lib/GearIcon";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import * as Toolbar from "kumo-svelte/components/toolbar";
  import type { ToolbarSize } from "kumo-svelte/components/toolbar";

  const sizes: ToolbarSize[] = ["xs", "sm", "base", "lg"];
</script>

<div class="flex flex-col items-start gap-4">
  {#each sizes as size}
    <Toolbar.Root aria-label={`${size} toolbar`} {size}>
      <Toolbar.Button icon={PlusIcon}>Create</Toolbar.Button>
      <Toolbar.Button icon={GearIcon} aria-label="Settings" />
    </Toolbar.Root>
  {/each}
</div>
