<script lang="ts">
  import ArrowClockwiseIcon from "phosphor-svelte/lib/ArrowClockwiseIcon";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import * as Toolbar from "kumo-svelte/components/toolbar";
</script>

<Toolbar.Root aria-label="Toolbar preview" size="sm">
  <Toolbar.Button icon={PlusIcon}>Create</Toolbar.Button>
  <Toolbar.Button icon={ArrowClockwiseIcon} aria-label="Refresh" />
</Toolbar.Root>
