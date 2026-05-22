<script lang="ts">
  import { SkeletonLine } from "kumo-svelte/components/loader";
</script>

<div class="flex w-64 flex-col gap-1">
  <div class="relative">
    <div class="absolute top-0 right-full bottom-0 mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">32px</div>
    <SkeletonLine blockHeight={32} />
  </div>
  <div class="relative">
    <div class="absolute top-0 right-full bottom-0 mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">48px</div>
    <SkeletonLine blockHeight={48} />
  </div>
  <div class="relative">
    <div class="absolute top-0 right-full bottom-0 mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">64px</div>
    <SkeletonLine blockHeight={64} />
  </div>
</div>
