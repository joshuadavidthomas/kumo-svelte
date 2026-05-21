<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
  import XCircleIcon from "phosphor-svelte/lib/XCircleIcon";
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupSuffix } from "kumo-svelte";
</script>

<div class="flex w-full max-w-2xs flex-col gap-4">
  <InputGroup label="Subdomain">
    <InputGroupInput aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroupSuffix>.workers.dev</InputGroupSuffix>
    <InputGroupAddon align="end">
      <CheckCircleIcon weight="duotone" class="text-kumo-success" />
    </InputGroupAddon>
  </InputGroup>

  <InputGroup label="Subdomain" error="This subdomain is unavailable">
    <InputGroupInput aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroupSuffix>.workers.dev</InputGroupSuffix>
    <InputGroupAddon align="end">
      <XCircleIcon weight="duotone" class="text-kumo-danger" />
    </InputGroupAddon>
  </InputGroup>
</div>
