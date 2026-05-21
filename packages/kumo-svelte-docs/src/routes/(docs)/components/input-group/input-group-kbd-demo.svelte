<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroupAddon>
    <MagnifyingGlassIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." aria-label="Search" />
  <InputGroupAddon align="end">
    <kbd class="border-none! bg-none!">⌘K</kbd>
  </InputGroupAddon>
</InputGroup>
