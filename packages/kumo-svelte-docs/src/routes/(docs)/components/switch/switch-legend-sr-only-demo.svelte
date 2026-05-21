<script lang="ts">
  import { SwitchGroup, SwitchItem, SwitchLegend } from "kumo-svelte";
</script>

<SwitchGroup>
  <SwitchLegend class="sr-only">Notification settings</SwitchLegend>
  <SwitchItem label="Email notifications" />
  <SwitchItem label="SMS notifications" />
  <SwitchItem label="Push notifications" />
</SwitchGroup>
