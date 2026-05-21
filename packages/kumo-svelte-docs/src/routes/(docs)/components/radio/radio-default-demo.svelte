<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("personal");
</script>

<RadioGroup legend="Account type" {value} onValueChange={(next) => (value = next)}>
  <RadioItem label="Personal" value="personal" />
  <RadioItem label="Business" value="business" />
  <RadioItem label="Enterprise" value="enterprise" />
</RadioGroup>
