<script lang="ts">
  import { Radio } from "kumo-svelte";

  let value = $state("md");
</script>

<Radio.Group legend="Size" orientation="horizontal" {value} onValueChange={(next) => (value = next)}>
  <Radio.Item label="Small" value="sm" />
  <Radio.Item label="Medium" value="md" />
  <Radio.Item label="Large" value="lg" />
</Radio.Group>
