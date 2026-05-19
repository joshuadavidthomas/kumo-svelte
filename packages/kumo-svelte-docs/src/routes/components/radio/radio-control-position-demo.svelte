<script lang="ts">
  import { RadioGroup, RadioItem } from "kumo-svelte";
</script>

<RadioGroup legend="Preferences" controlPosition="end" defaultValue="a">
  <RadioItem label="Label before radio" value="a" />
  <RadioItem label="Another option" value="b" />
</RadioGroup>
