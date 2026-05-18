<script lang="ts">
  import { Button } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<div class="grid gap-3">
  <Button icon={PlusIcon}>Create Worker</Button>
  <Button variant="primary" icon={PlusIcon}>
    Create Worker
  </Button>
  <Button loading>Create Worker</Button>
</div>
