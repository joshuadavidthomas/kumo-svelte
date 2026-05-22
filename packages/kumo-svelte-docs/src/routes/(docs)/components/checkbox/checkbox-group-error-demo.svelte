<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let preferences = $state<string[]>([]);
</script>

<Checkbox.Group
  legend="Required preferences"
  error="Please select at least one notification method"
  value={preferences}
  onValueChange={(value) => (preferences = value)}
>
  <Checkbox.Item value="email" label="Email" variant="error" />
  <Checkbox.Item value="sms" label="SMS" variant="error" />
</Checkbox.Group>
