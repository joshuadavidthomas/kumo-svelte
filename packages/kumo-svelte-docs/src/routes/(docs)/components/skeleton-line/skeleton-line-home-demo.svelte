<script lang="ts">
  import { SkeletonLine } from "kumo-svelte";
</script>

<div class="flex w-[200px] flex-col gap-2">
  <SkeletonLine minWidth={50} maxWidth={100} />
  <SkeletonLine minWidth={100} />
  <SkeletonLine minWidth={50} maxWidth={150} />
</div>
