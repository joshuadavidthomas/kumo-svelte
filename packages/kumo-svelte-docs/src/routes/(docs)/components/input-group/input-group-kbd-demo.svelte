<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
</script>

<InputGroup.Root class="w-full max-w-3xs">
  <InputGroup.Addon>
    <MagnifyingGlassIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search..." aria-label="Search" />
  <InputGroup.Addon align="end">
    <kbd class="border-none! bg-none!">⌘K</kbd>
  </InputGroup.Addon>
</InputGroup.Root>
