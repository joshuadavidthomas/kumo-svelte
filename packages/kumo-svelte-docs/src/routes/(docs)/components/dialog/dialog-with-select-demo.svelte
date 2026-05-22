<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as Dialog from "kumo-svelte/components/dialog";
  import * as Select from "kumo-svelte/components/select";
  import XIcon from "phosphor-svelte/lib/XIcon";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-west", label: "EU West" },
    { value: "ap-south", label: "AP South" },
  ];

  let region = $state("");
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Open Form</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content class="p-8">
    <div class="mb-4 flex items-start justify-between gap-4">
      <Dialog.Title class="text-2xl font-semibold">Create Resource</Dialog.Title>
      <Dialog.Close aria-label="Close">
        {#snippet child({ props })}
          <Button {...props} variant="secondary" shape="square" icon={XIcon} aria-label="Close" />
        {/snippet}
      </Dialog.Close>
    </div>
    <Dialog.Description class="mb-4 text-kumo-subtle">Select a region for your new resource.</Dialog.Description>
    <Select.Root
      items={regions}
      value={region}
      onValueChange={(value) => {
        region = value as string;
      }}
      placeholder="Select region..."
      class="w-full"
    />
    <div class="mt-8 flex justify-end gap-2">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary">Cancel</Button>
        {/snippet}
      </Dialog.Close>
      <Button variant="primary">Create</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
