<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";

  let value = $state("email");
</script>

<RadioGroup legend="Notification preference" {value} onValueChange={(next) => (value = next)}>
  <RadioItem label="Email" value="email" />
  <RadioItem label="SMS" value="sms" />
  <RadioItem label="Push notification" value="push" />
</RadioGroup>
