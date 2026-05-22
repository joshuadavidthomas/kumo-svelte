<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  const regions = {
    available: [
      { value: "us-east-1", label: "US East (N. Virginia)" },
      { value: "us-west-2", label: "US West (Oregon)" },
      { value: "eu-west-1", label: "EU West (Ireland)" },
    ],
    unavailable: [
      { value: "ap-south-1", label: "AP South (Mumbai)" },
      { value: "sa-east-1", label: "SA East (São Paulo)" },
    ],
  };

  let value = $state("");
</script>

<Select.Root
  label="Server Region"
  placeholder="Select a region..."
  class="w-[260px]"
  {value}
  onValueChange={(next) => (value = next as string)}
>
  <Select.Group>
    <Select.GroupLabel>Available</Select.GroupLabel>
    {#each regions.available as region (region.value)}
      <Select.Option value={region.value}>{region.label}</Select.Option>
    {/each}
  </Select.Group>
  <Select.Separator />
  <Select.Group>
    <Select.GroupLabel>Unavailable</Select.GroupLabel>
    {#each regions.unavailable as region (region.value)}
      <Select.Option value={region.value} disabled>{region.label}</Select.Option>
    {/each}
  </Select.Group>
</Select.Root>
