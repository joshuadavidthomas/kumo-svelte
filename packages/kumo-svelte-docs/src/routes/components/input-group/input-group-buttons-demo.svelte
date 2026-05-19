<script lang="ts">
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import XIcon from "phosphor-svelte/lib/XIcon";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "kumo-svelte";

  let show = $state(false);
  let searchValue = $state("search");
</script>

<div class="flex flex-col gap-4">
  <InputGroup class="w-full max-w-3xs">
    <InputGroupInput type={show ? "text" : "password"} value="password" aria-label="Password" />
    <InputGroupAddon align="end" containsButton>
      <InputGroupButton
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
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroupAddon>
      <MagnifyingGlassIcon />
    </InputGroupAddon>
    <InputGroupInput bind:value={searchValue} placeholder="Search" aria-label="Search" />
    {#if searchValue}
      <InputGroupAddon align="end" containsButton class="pr-1">
        <InputGroupButton
          aria-label="Clear search"
          onclick={() => {
            searchValue = "";
          }}
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    {/if}
    <InputGroupButton variant="secondary">Search</InputGroupButton>
  </InputGroup>
</div>
