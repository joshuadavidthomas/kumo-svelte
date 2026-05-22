<script lang="ts">
  import { Switch } from "kumo-svelte";
</script>

<Switch.Group legend="Notification settings">
  <Switch.Item label="Email notifications" />
  <Switch.Item label="SMS notifications" />
  <Switch.Item label="Push notifications" />
</Switch.Group>
