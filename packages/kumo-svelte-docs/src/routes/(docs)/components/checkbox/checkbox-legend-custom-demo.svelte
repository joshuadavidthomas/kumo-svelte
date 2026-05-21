<script lang="ts">
  import { CheckboxGroup, CheckboxItem, CheckboxLegend } from "kumo-svelte";

  let preferences = $state(["email"]);
</script>

<CheckboxGroup value={preferences} onValueChange={(value) => (preferences = value)}>
  <CheckboxLegend class="text-sm font-normal text-kumo-subtle">
    Notification preferences
  </CheckboxLegend>
  <CheckboxItem value="email" label="Email notifications" />
  <CheckboxItem value="sms" label="SMS notifications" />
  <CheckboxItem value="push" label="Push notifications" />
</CheckboxGroup>
