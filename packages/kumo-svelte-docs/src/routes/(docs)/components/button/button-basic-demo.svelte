<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button variant="secondary">Button</Button>
  <Button variant="secondary" shape="square" icon={PlusIcon} aria-label="Add" />
</div>
