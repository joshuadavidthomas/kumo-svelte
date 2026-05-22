<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state("free");
</script>

<Select.Root
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
