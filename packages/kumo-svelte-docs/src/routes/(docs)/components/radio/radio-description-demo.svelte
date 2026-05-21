<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("standard");
</script>

<RadioGroup
  legend="Shipping method"
  description="Choose how you'd like to receive your order"
  {value}
  onValueChange={(next) => (value = next)}
>
  <RadioItem label="Standard (5-7 days)" value="standard" />
  <RadioItem label="Express (2-3 days)" value="express" />
  <RadioItem label="Overnight" value="overnight" />
</RadioGroup>
