<script lang="ts">
  import { Input } from "kumo-svelte/components/input";
</script>

<Input
  label="Email"
  placeholder="name@example.com"
  type="email"
  variant="error"
  error="Please enter a valid email."
  description="The email to send notifications to."
/>
