<script lang="ts">
  import {
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxTriggerInput,
    Dialog,
    DialogClose,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
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
    <DialogDescription class="mb-4 text-kumo-subtle">
      Search and select a region for your new resource.
    </DialogDescription>
    <Combobox bind:value={region} items={regions}>
      <ComboboxTriggerInput class="w-full" placeholder="Search regions..." />
      <ComboboxContent>
        <ComboboxEmpty>No regions found</ComboboxEmpty>
        <ComboboxList>
          {#each regions as item (item.value)}
            <ComboboxItem value={item.value}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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
