<script lang="ts">
  import * as Radio from "kumo-svelte/components/radio";
  let value = $state("email");
</script>

<Radio.Group {value} onValueChange={(next) => (value = next)}>
  <Radio.Legend class="text-sm font-normal text-kumo-subtle">Notification preference</Radio.Legend>
  <Radio.Item label="Email" value="email" />
  <Radio.Item label="SMS" value="sms" />
  <Radio.Item label="Push notification" value="push" />
</Radio.Group>
