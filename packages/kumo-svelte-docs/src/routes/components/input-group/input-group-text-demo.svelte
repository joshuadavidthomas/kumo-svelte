<script lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupInput } from "kumo-svelte";
</script>

<div class="flex flex-col gap-4">
  <InputGroup class="w-full max-w-3xs">
    <InputGroupAddon>@</InputGroupAddon>
    <InputGroupInput placeholder="username" aria-label="Username" />
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroupInput placeholder="email" aria-label="Email" />
    <InputGroupAddon align="end">@example.com</InputGroupAddon>
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroupAddon>/api/</InputGroupAddon>
    <InputGroupInput placeholder="endpoint" aria-label="API path" />
    <InputGroupAddon align="end">.json</InputGroupAddon>
  </InputGroup>
</div>
