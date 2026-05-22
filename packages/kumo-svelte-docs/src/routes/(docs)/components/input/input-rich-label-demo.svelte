<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
</script>

{#snippet label()}
  <span>Email for <strong>billing</strong></span>
{/snippet}

<Input label={label} required placeholder="billing@company.com" type="email" />
