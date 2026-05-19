<script lang="ts">
  import { Input } from "kumo-svelte";

  let value = $state("");
</script>

<Input
  label="With oninput"
  placeholder="Type something..."
  description={value ? `Value: ${value}` : "Uses event.currentTarget.value"}
  {value}
  oninput={(event) => {
    value = event.currentTarget.value;
  }}
/>
