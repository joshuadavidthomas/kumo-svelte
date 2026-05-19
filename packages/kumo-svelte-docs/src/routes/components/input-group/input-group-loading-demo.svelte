<script lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupInput, Loader } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroupInput value="kumo" aria-label="kumo" />
  <InputGroupAddon align="end">
    <Loader />
  </InputGroupAddon>
</InputGroup>
