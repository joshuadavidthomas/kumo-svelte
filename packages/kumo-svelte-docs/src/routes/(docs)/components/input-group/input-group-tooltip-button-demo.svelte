<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import QuestionIcon from "phosphor-svelte/lib/QuestionIcon";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-2xs">
  <InputGroupAddon>
    <MagnifyingGlassIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search with query language..." aria-label="Search" />
  <InputGroupAddon align="end" containsButton>
    <InputGroupButton class="text-kumo-subtle" tooltip="Query language help">
      <QuestionIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
