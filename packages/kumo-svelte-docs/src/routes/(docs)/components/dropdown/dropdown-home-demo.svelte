<script lang="ts">
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
  import { Button } from "kumo-svelte/components/button";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} icon={PlusIcon}>Add</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Worker</DropdownMenu.Item>
    <DropdownMenu.Item>Pages</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
