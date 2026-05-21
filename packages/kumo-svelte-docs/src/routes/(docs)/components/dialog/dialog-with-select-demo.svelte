<script lang="ts">
  import {
    Button,
    Dialog,
    DialogClose,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Select,
  } from "kumo-svelte";
  import XIcon from "phosphor-svelte/lib/XIcon";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-west", label: "EU West" },
    { value: "ap-south", label: "AP South" },
  ];

  let region = $state("");
</script>

<DialogRoot>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props}>Open Form</Button>
    {/snippet}
  </DialogTrigger>
  <Dialog class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <DialogTitle class="text-2xl font-semibold">Create Resource</DialogTitle>
      <DialogClose aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </DialogClose>
    </div>
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
    <div class="mt-8 flex justify-end gap-2">
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Cancel</Button>
        {/snippet}
      </DialogClose>
      <Button variant="primary">Create</Button>
    </div>
  </Dialog>
</DialogRoot>
