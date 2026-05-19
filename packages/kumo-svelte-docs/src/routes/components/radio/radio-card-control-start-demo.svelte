<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("free");
</script>

<RadioGroup
  legend="Choose a plan"
  appearance="card"
  controlPosition="start"
  {value}
  onValueChange={(next) => (value = next)}
>
  <RadioItem label="Free" description="For personal or hobby projects that aren't business-critical." value="free" />
  <RadioItem label="Pro" description="For professional websites that aren't business-critical." value="pro" />
</RadioGroup>
