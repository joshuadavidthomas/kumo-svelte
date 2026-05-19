<script lang="ts">
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "kumo-svelte";

  let show = $state(false);
</script>

<div class="flex w-full max-w-3xs flex-col gap-4">
  <InputGroup label="Error State" error="Please enter a valid email address">
    <InputGroupInput type="email" value="invalid-email" />
    <InputGroupAddon align="end">@example.com</InputGroupAddon>
  </InputGroup>

  <InputGroup label="Disabled" disabled>
    <InputGroupAddon>
      <MagnifyingGlassIcon />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search..." />
  </InputGroup>

  <InputGroup label="Optional Field" required={false}>
    <InputGroupAddon>$</InputGroupAddon>
    <InputGroupInput placeholder="0.00" />
  </InputGroup>

  <InputGroup label="With Description" description="Must be at least 8 characters">
    <InputGroupInput type={show ? "text" : "password"} placeholder="Password" />
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
</div>
