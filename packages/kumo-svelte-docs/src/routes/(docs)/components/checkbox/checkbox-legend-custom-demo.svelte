<script lang="ts">
  import * as Checkbox from "kumo-svelte/components/checkbox";
  let preferences = $state(["email"]);
</script>

<Checkbox.Group bind:value={preferences}>
  <Checkbox.Legend class="text-sm font-normal text-kumo-subtle">
    Notification preferences
  </Checkbox.Legend>
  <Checkbox.Item value="email" label="Email notifications" />
  <Checkbox.Item value="sms" label="SMS notifications" />
  <Checkbox.Item value="push" label="Push notifications" />
</Checkbox.Group>
