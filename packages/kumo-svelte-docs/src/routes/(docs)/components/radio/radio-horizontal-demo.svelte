<script lang="ts">
  import * as Radio from "kumo-svelte/components/radio";
  let value = $state("md");
</script>

<Radio.Group legend="Size" orientation="horizontal" {value} onValueChange={(next) => (value = next)}>
  <Radio.Item label="Small" value="sm" />
  <Radio.Item label="Medium" value="md" />
  <Radio.Item label="Large" value="lg" />
</Radio.Group>
