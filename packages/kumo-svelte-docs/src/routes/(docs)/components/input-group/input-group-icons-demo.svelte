<script lang="ts">
  import LinkIcon from "phosphor-svelte/lib/LinkIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
</script>

<InputGroup.Root class="w-full max-w-3xs">
  <InputGroup.Addon>
    <LinkIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Paste a link..." aria-label="Link" />
</InputGroup.Root>
