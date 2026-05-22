<script lang="ts">
  import { InputArea } from "kumo-svelte/components/input";
</script>

<InputArea label="Feedback" value="Bad" error="Feedback must be at least 20 characters" minlength={20} />
