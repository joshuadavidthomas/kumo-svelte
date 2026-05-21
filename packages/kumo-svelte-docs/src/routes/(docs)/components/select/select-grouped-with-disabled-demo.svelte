<script lang="ts">
  import { Select, SelectGroup, SelectGroupLabel, SelectOption, SelectSeparator } from "kumo-svelte";

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

<Select
  label="Server Region"
  placeholder="Select a region..."
  class="w-[260px]"
  {value}
  onValueChange={(next) => (value = next as string)}
>
  <SelectGroup>
    <SelectGroupLabel>Available</SelectGroupLabel>
    {#each regions.available as region (region.value)}
      <SelectOption value={region.value}>{region.label}</SelectOption>
    {/each}
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectGroupLabel>Unavailable</SelectGroupLabel>
    {#each regions.unavailable as region (region.value)}
      <SelectOption value={region.value} disabled>{region.label}</SelectOption>
    {/each}
  </SelectGroup>
</Select>
