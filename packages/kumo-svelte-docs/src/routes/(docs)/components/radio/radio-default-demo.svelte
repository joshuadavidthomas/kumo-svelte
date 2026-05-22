<script lang="ts">
  import { Radio } from "kumo-svelte";

  let value = $state("personal");
</script>

<Radio.Group legend="Account type" {value} onValueChange={(next) => (value = next)}>
  <Radio.Item label="Personal" value="personal" />
  <Radio.Item label="Business" value="business" />
  <Radio.Item label="Enterprise" value="enterprise" />
</Radio.Group>
