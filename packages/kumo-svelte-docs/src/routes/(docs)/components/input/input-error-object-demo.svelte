<script lang="ts">
  import { Input } from "kumo-svelte";
</script>

<Input
  label="Password"
  type="password"
  value="short"
  error="Password must be at least 8 characters"
  minlength={8}
/>
