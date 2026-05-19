<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("md");
</script>

<RadioGroup legend="Size" orientation="horizontal" {value} onValueChange={(next) => (value = next)}>
  <RadioItem label="Small" value="sm" />
  <RadioItem label="Medium" value="md" />
  <RadioItem label="Large" value="lg" />
</RadioGroup>
