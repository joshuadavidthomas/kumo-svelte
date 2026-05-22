<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
  import XCircleIcon from "phosphor-svelte/lib/XCircleIcon";
  import { InputGroup } from "kumo-svelte";
</script>

<div class="flex w-full max-w-2xs flex-col gap-4">
  <InputGroup label="Subdomain">
    <InputGroup.Input aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    <InputGroup.Addon align="end">
      <CheckCircleIcon weight="duotone" class="text-kumo-success" />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup label="Subdomain" error="This subdomain is unavailable">
    <InputGroup.Input aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    <InputGroup.Addon align="end">
      <XCircleIcon weight="duotone" class="text-kumo-danger" />
    </InputGroup.Addon>
  </InputGroup>
</div>
