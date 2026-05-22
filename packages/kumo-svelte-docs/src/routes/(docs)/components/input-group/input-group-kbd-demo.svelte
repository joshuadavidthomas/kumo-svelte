<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import { InputGroup } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Addon>
    <MagnifyingGlassIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search..." aria-label="Search" />
  <InputGroup.Addon align="end">
    <kbd class="border-none! bg-none!">⌘K</kbd>
  </InputGroup.Addon>
</InputGroup>
