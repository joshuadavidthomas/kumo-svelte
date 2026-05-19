<script lang="ts">
  import { Button, Dialog, DialogClose, DialogDescription, DialogFooter, DialogRoot, DialogTitle, Select } from "kumo-svelte";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-west", label: "EU West" },
    { value: "ap-south", label: "AP South" },
  ];
  let open = $state(false);
  let region = $state("");
</script>

<Button onclick={() => (open = true)}>Open Form</Button>

<DialogRoot bind:open>
  <Dialog class="p-8">
    <DialogTitle class="mb-2 text-2xl">Create Resource</DialogTitle>
    <DialogDescription class="mb-4 text-kumo-subtle">Select a region for your new resource.</DialogDescription>
    <Select
      items={regions}
      value={region}
      onValueChange={(value) => {
        region = value as string;
      }}
      placeholder="Select region..."
      class="w-full"
    />
    <DialogFooter class="mt-8">
      <DialogClose class="rounded-md border border-kumo-line px-3 py-2 text-sm hover:bg-kumo-hover">Cancel</DialogClose>
      <Button>Create</Button>
    </DialogFooter>
  </Dialog>
</DialogRoot>
