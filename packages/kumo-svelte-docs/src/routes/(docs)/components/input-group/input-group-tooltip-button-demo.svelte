<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import QuestionIcon from "phosphor-svelte/lib/QuestionIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
</script>

<InputGroup.Root class="w-full max-w-2xs">
  <InputGroup.Addon>
    <MagnifyingGlassIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search with query language..." aria-label="Search" />
  <InputGroup.Addon align="end" containsButton>
    <InputGroup.Button class="text-kumo-subtle" tooltip="Query language help">
      <QuestionIcon />
    </InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>
