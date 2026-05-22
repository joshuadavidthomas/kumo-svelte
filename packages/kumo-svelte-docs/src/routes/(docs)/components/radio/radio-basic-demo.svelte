<script lang="ts">
  import * as Radio from "kumo-svelte/components/radio";
  let value = $state("email");
</script>

<Radio.Group legend="Notification preference" {value} onValueChange={(next) => (value = next)}>
  <Radio.Item label="Email" value="email" />
  <Radio.Item label="SMS" value="sms" />
  <Radio.Item label="Push notification" value="push" />
</Radio.Group>
