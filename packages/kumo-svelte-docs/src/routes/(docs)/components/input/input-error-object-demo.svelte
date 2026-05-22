<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
</script>

<Input
  label="Password"
  type="password"
  value="short"
  error="Password must be at least 8 characters"
  minlength={8}
/>
