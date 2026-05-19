<script lang="ts">
  import { CheckboxGroup, CheckboxItem } from "kumo-svelte";

  let preferences = $state(["email"]);
</script>

<CheckboxGroup
  legend="Email preferences"
  description="Choose how you'd like to receive updates"
  value={preferences}
  onValueChange={(value) => (preferences = value)}
>
  <CheckboxItem value="email" label="Email notifications" />
  <CheckboxItem value="sms" label="SMS notifications" />
  <CheckboxItem value="push" label="Push notifications" />
</CheckboxGroup>
