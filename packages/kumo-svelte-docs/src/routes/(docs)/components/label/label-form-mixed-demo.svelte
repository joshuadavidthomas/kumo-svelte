<script lang="ts">
  import { Input } from "kumo-svelte";
  import * as Select from "kumo-svelte/components/select";
  const countries = {
    us: "United States",
    uk: "United Kingdom",
    ca: "Canada",
  };
</script>

{#snippet emailTooltip()}
  We'll send your receipt here
{/snippet}

<div class="flex max-w-md flex-col gap-4">
  <Input label="Full Name" placeholder="John Doe" />
  <Input label="Email" labelTooltip={emailTooltip} placeholder="john@example.com" type="email" />
  <Input label="Company" required={false} placeholder="Acme Inc." />
  <Select.Root label="Country" placeholder="Select a country" items={countries} />
</div>
