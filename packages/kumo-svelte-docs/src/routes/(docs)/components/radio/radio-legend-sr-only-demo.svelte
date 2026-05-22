<script lang="ts">
  import { Radio } from "kumo-svelte";

  let value = $state("all");
</script>

<Radio.Group {value} onValueChange={(next) => (value = next)}>
  <Radio.Legend class="sr-only">Paths</Radio.Legend>
  <Radio.Item label="Allow all paths" value="all" />
  <Radio.Item label="Restrict to specific paths" value="specific" />
</Radio.Group>
