<script lang="ts">
  import CubeIcon from "phosphor-svelte/lib/CubeIcon";
</script>

<div
  class="flex w-full min-w-0 items-center gap-2 px-3 transition-[padding] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] group-data-[state=collapsed]/sidebar:px-2"
>
  <CubeIcon class="size-4 shrink-0 text-kumo-brand" weight="duotone" />
  <span class="truncate text-sm font-semibold text-kumo-strong group-data-[state=collapsed]/sidebar:hidden">
    Company
  </span>
</div>
