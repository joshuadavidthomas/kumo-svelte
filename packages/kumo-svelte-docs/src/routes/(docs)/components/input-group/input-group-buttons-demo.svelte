<script lang="ts">
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
  let show = $state(false);
  let searchValue = $state("search");
</script>

<div class="flex flex-col gap-4">
  <InputGroup.Root class="w-full max-w-3xs">
    <InputGroup.Input type={show ? "text" : "password"} value="password" aria-label="Password" />
    <InputGroup.Addon align="end" containsButton>
      <InputGroup.Button
        class="text-kumo-subtle"
        aria-label={show ? "Hide password" : "Show password"}
        onclick={() => {
          show = !show;
        }}
      >
        {#if show}
          <EyeSlashIcon />
        {:else}
          <EyeIcon />
        {/if}
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>

  <InputGroup.Root class="w-full max-w-3xs" focusMode="individual">
    <InputGroup.Addon>
      <MagnifyingGlassIcon />
    </InputGroup.Addon>
    <InputGroup.Input bind:value={searchValue} placeholder="Search" aria-label="Search" />
    {#if searchValue}
      <InputGroup.Addon align="end" containsButton class="pr-1">
        <InputGroup.Button
          aria-label="Clear search"
          onclick={() => {
            searchValue = "";
          }}
        >
          <XIcon />
        </InputGroup.Button>
      </InputGroup.Addon>
    {/if}
    <InputGroup.Button variant="secondary">Search</InputGroup.Button>
  </InputGroup.Root>
</div>
