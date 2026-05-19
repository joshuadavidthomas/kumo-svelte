<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTriggerInput } from "kumo-svelte";

  const plans = ["Free", "Pro", "Business", "Enterprise"];
  const items = plans.map((plan) => ({ label: plan, value: plan }));
  let value = $state("Pro");
  let open = $state(false);
</script>

<Combobox
  bind:value
  bind:open
  {items}
  label="Plan"
  description="Choose the plan this zone should use."
  required
>
  <ComboboxTriggerInput placeholder="Select a plan" />
  <ComboboxContent>
    <ComboboxList>
      {#each plans as plan}
        <ComboboxItem value={plan}>{plan}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
