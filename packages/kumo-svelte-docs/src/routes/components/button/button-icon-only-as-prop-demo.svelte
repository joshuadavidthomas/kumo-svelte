<script lang="ts">
  import { Button } from "kumo-svelte";
  import PlusIcon from "phosphor-svelte/lib/PlusIcon";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button
    variant="secondary"
    shape="square"
    icon={PlusIcon}
    aria-label="Add item"
  />
  <Button
    variant="secondary"
    shape="circle"
    icon={PlusIcon}
    aria-label="Add item"
  />
</div>
