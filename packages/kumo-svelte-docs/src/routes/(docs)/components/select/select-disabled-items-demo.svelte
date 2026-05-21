<script lang="ts">
  import { Select } from "kumo-svelte";

  let value = $state("free");
</script>

<Select
  label="Plan"
  class="w-[200px]"
  {value}
  onValueChange={(next) => (value = next as string)}
  items={{
    free: "Free",
    pro: "Pro",
    business: { label: "Business", disabled: true },
    enterprise: { label: "Enterprise", disabled: true },
  }}
/>
