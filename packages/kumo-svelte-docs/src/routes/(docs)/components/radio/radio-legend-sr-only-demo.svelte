<script lang="ts">
  import * as Radio from "kumo-svelte/components/radio";
  let value = $state("all");
</script>

<Radio.Group {value} onValueChange={(next) => (value = next)}>
  <Radio.Legend class="sr-only">Paths</Radio.Legend>
  <Radio.Item label="Allow all paths" value="all" />
  <Radio.Item label="Restrict to specific paths" value="specific" />
</Radio.Group>
