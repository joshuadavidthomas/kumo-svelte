<script lang="ts">
  import { CheckboxGroup, CheckboxItem } from "kumo-svelte";

  let preferences = $state<string[]>([]);
</script>

<CheckboxGroup
  legend="Required preferences"
  error="Please select at least one notification method"
  value={preferences}
  onValueChange={(value) => (preferences = value)}
>
  <CheckboxItem value="email" label="Email" variant="error" />
  <CheckboxItem value="sms" label="SMS" variant="error" />
</CheckboxGroup>
