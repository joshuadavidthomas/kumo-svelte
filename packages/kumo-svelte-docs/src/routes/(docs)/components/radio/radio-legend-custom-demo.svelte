<script lang="ts">
  import { RadioGroup, RadioItem, RadioLegend } from "kumo-svelte";

  let value = $state("email");
</script>

<RadioGroup {value} onValueChange={(next) => (value = next)}>
  <RadioLegend class="text-sm font-normal text-kumo-subtle">Notification preference</RadioLegend>
  <RadioItem label="Email" value="email" />
  <RadioItem label="SMS" value="sms" />
  <RadioItem label="Push notification" value="push" />
</RadioGroup>
