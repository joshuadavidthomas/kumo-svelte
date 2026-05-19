<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "kumo-svelte";

  let showSidebar = $state(true);
  let showLineNumbers = $state(false);
  let wordWrap = $state(true);
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="secondary">View Options</Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Display</DropdownMenuLabel>
      <DropdownMenuCheckboxItem bind:checked={showSidebar}>Show sidebar</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem bind:checked={showLineNumbers}>Show line numbers</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem bind:checked={wordWrap}>Word wrap</DropdownMenuCheckboxItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
