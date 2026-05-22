<script lang="ts">
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
  let show = $state(false);
</script>

<div class="flex w-full max-w-3xs flex-col gap-4">
  <InputGroup.Root label="Error State" error="Please enter a valid email address">
    <InputGroup.Input type="email" value="invalid-email" />
    <InputGroup.Addon align="end">@example.com</InputGroup.Addon>
  </InputGroup.Root>

  <InputGroup.Root label="Disabled" disabled>
    <InputGroup.Addon>
      <MagnifyingGlassIcon />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="Search..." />
  </InputGroup.Root>

  <InputGroup.Root label="Optional Field" required={false}>
    <InputGroup.Addon>$</InputGroup.Addon>
    <InputGroup.Input placeholder="0.00" />
  </InputGroup.Root>

  <InputGroup.Root label="With Description" description="Must be at least 8 characters">
    <InputGroup.Input type={show ? "text" : "password"} placeholder="Password" />
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
</div>
