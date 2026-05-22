<script lang="ts">
  import { Checkbox } from "kumo-svelte";

  let preferences = $state(["email"]);
</script>

<Checkbox.Group value={preferences} onValueChange={(value) => (preferences = value)}>
  <Checkbox.Legend class="sr-only">Notification preferences</Checkbox.Legend>
  <Checkbox.Item value="email" label="Email notifications" />
  <Checkbox.Item value="sms" label="SMS notifications" />
  <Checkbox.Item value="push" label="Push notifications" />
</Checkbox.Group>
