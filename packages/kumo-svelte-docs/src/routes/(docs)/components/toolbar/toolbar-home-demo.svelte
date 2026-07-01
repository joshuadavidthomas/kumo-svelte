<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import * as Toolbar from "kumo-svelte/components/toolbar";
</script>

<Toolbar.Root aria-label="Toolbar preview" class="w-[260px]">
  <Toolbar.Input aria-label="Search DNS records" placeholder="Search..." class="flex-1" />
  <Toolbar.Button icon={MagnifyingGlassIcon} aria-label="Search" />
  <Toolbar.Button icon={PlusIcon} aria-label="Add" />
</Toolbar.Root>
