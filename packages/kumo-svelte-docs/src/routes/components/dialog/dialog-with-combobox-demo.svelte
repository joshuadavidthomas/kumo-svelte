<script lang="ts">
  import { Button, Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput, Dialog, DialogClose, DialogDescription, DialogFooter, DialogRoot, DialogTitle } from "kumo-svelte";

  const regions = ["US East", "US West", "EU West", "AP South"];
  const items = regions.map((region) => ({ label: region, value: region }));
  let open = $state(false);
  let comboboxOpen = $state(false);
  let region = $state("");
</script>

<Button onclick={() => (open = true)}>Open Form</Button>

<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogTitle class="mb-2 text-2xl">Create Resource</DialogTitle>
    <DialogDescription class="mb-4 text-kumo-subtle">Search for a deployment region.</DialogDescription>
    <Combobox bind:value={region} bind:open={comboboxOpen} {items}>
      <ComboboxTriggerInput placeholder="Search regions" />
      <ComboboxContent>
        <ComboboxList>
          {#each regions as item}
            <ComboboxItem value={item}>{item}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
    <DialogFooter class="mt-8">
      <DialogClose class="rounded-md border border-kumo-line px-3 py-2 text-sm hover:bg-kumo-hover">Cancel</DialogClose>
      <Button>Create</Button>
    </DialogFooter>
  </Dialog>
</DialogRoot>
