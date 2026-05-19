<script lang="ts">
  import LinkIcon from "phosphor-svelte/lib/LinkIcon";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "kumo-svelte";
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroupAddon>
    <LinkIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Paste a link..." aria-label="Link" />
</InputGroup>
