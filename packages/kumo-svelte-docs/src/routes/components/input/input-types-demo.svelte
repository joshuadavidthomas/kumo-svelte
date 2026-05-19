<script lang="ts">
  import { Input } from "kumo-svelte";
</script>

<div class="flex flex-col gap-4">
  <Input type="email" label="Email" placeholder="you@example.com" />
  <Input type="password" label="Password" placeholder="••••••••" />
  <Input type="number" label="Age" placeholder="18" />
  <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
</div>
