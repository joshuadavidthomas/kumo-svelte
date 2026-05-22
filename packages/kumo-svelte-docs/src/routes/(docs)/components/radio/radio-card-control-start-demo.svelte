<script lang="ts">
  import * as Radio from "kumo-svelte/components/radio";
  let value = $state("free");
</script>

<Radio.Group
  legend="Choose a plan"
  appearance="card"
  controlPosition="start"
  {value}
  onValueChange={(next) => (value = next)}
>
  <Radio.Item label="Free" description="For personal or hobby projects that aren't business-critical." value="free" />
  <Radio.Item label="Pro" description="For professional websites that aren't business-critical." value="pro" />
</Radio.Group>
