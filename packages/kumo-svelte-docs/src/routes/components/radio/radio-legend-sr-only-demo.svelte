<script lang="ts">
  import { RadioGroup, RadioItem, RadioLegend } from "kumo-svelte";

  let value = $state("all");
</script>

<RadioGroup {value} onValueChange={(next) => (value = next)}>
  <RadioLegend class="sr-only">Paths</RadioLegend>
  <RadioItem label="Allow all paths" value="all" />
  <RadioItem label="Restrict to specific paths" value="specific" />
</RadioGroup>
