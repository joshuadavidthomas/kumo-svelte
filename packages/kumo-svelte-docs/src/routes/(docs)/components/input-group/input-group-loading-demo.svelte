<script lang="ts">
  import { Loader } from "kumo-svelte";
  import * as InputGroup from "kumo-svelte/components/input-group";
</script>

<InputGroup.Root class="w-full max-w-3xs">
  <InputGroup.Input value="kumo" aria-label="kumo" />
  <InputGroup.Addon align="end">
    <Loader />
  </InputGroup.Addon>
</InputGroup.Root>
