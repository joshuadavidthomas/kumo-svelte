<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("free");
</script>

<RadioGroup
  legend="Choose a plan"
  appearance="card"
  orientation="horizontal"
  {value}
  onValueChange={(next) => (value = next)}
>
  <RadioItem label="Free" description="For personal or hobby projects that aren't business-critical." value="free" />
  <RadioItem label="Pro" description="For professional websites that aren't business-critical." value="pro" />
  <RadioItem label="Business" description="For small businesses operating online." value="business" />
  <RadioItem label="Contract" description="For mission-critical applications that are core to your business." value="contract" />
</RadioGroup>
