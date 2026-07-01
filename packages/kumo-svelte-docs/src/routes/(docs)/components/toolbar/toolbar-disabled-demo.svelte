<script lang="ts">
  import ArrowClockwiseIcon from "phosphor-svelte/lib/ArrowClockwiseIcon";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import * as Toolbar from "kumo-svelte/components/toolbar";
</script>

<Toolbar.Root aria-label="Disabled toolbar controls">
  <Toolbar.Button icon={PlusIcon}>Create</Toolbar.Button>
  <Toolbar.Button icon={ArrowClockwiseIcon} disabled focusableWhenDisabled>
    Syncing
  </Toolbar.Button>
  <Toolbar.Input value="Read-only filter" disabled focusableWhenDisabled aria-label="Filter" />
</Toolbar.Root>
