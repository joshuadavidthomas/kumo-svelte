<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let preferences = $state(["email"]);
</script>

<Checkbox.Group
  legend="Email preferences"
  description="Choose how you'd like to receive updates"
  value={preferences}
  onValueChange={(value) => (preferences = value)}
>
  <Checkbox.Item value="email" label="Email notifications" />
  <Checkbox.Item value="sms" label="SMS notifications" />
  <Checkbox.Item value="push" label="Push notifications" />
</Checkbox.Group>
