<script lang="ts">
  import { Button } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="secondary" shape="square" aria-label="Add item">
    <PlusIcon />
  </Button>
  <Button variant="secondary" shape="circle" aria-label="Add item">
    <PlusIcon />
  </Button>
</div>
