<script lang="ts">
  import { Select, SelectOption } from "kumo-svelte";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-west", label: "EU West", disabled: true },
    { value: "ap-south", label: "AP South", disabled: true },
  ];

  let value = $state("");
</script>

<Select
  label="Deployment Region"
  placeholder="Choose a region..."
  class="w-[250px]"
  {value}
  onValueChange={(next) => (value = next as string)}
>
  {#each regions as region (region.value)}
    <SelectOption value={region.value} disabled={region.disabled}>{region.label}</SelectOption>
  {/each}
</Select>
