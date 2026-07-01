<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
  import * as Toolbar from "kumo-svelte/components/toolbar";

  let query = $state("workers");
</script>

<Toolbar.Root aria-label="Search toolbar" class="w-full max-w-md">
  <Toolbar.InputGroup aria-label="Search resources" class="flex-1">
    <InputGroup.Addon>
      <MagnifyingGlassIcon />
    </InputGroup.Addon>
    <InputGroup.Input bind:value={query} placeholder="Search resources" aria-label="Search resources" />
    {#if query}
      <InputGroup.Addon align="end" containsButton>
        <InputGroup.Button
          aria-label="Clear search"
          onclick={() => {
            query = "";
          }}
        >
          <XIcon />
        </InputGroup.Button>
      </InputGroup.Addon>
    {/if}
  </Toolbar.InputGroup>
  <Toolbar.Button>Search</Toolbar.Button>
</Toolbar.Root>
