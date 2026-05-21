<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";
</script>

<div class="grid gap-6 md:grid-cols-2">
  <RadioGroup legend="Disabled group" disabled defaultValue="a">
    <RadioItem label="Option A" value="a" />
    <RadioItem label="Option B" value="b" />
  </RadioGroup>

  <RadioGroup legend="Individual disabled" defaultValue="available">
    <RadioItem label="Available" value="available" />
    <RadioItem label="Unavailable" value="unavailable" disabled />
  </RadioGroup>

  <RadioGroup legend="Disabled card group" appearance="card" disabled defaultValue="a">
    <RadioItem label="Option A" description="This option is disabled." value="a" />
    <RadioItem label="Option B" description="This option is disabled." value="b" />
  </RadioGroup>

  <RadioGroup legend="Individual disabled card" appearance="card" defaultValue="available">
    <RadioItem label="Available" description="This option can be selected." value="available" />
    <RadioItem label="Unavailable" description="This option is not available." value="unavailable" disabled />
  </RadioGroup>
</div>
