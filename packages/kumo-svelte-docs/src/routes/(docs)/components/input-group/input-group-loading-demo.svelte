<script lang="ts">
  import { InputGroup, Loader } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Input value="kumo" aria-label="kumo" />
  <InputGroup.Addon align="end">
    <Loader />
  </InputGroup.Addon>
</InputGroup>
