<script lang="ts">
  import { SwitchGroup, SwitchItem } from "kumo-svelte";
</script>

<SwitchGroup legend="Notification settings">
  <SwitchItem label="Email notifications" />
  <SwitchItem label="SMS notifications" />
  <SwitchItem label="Push notifications" />
</SwitchGroup>
