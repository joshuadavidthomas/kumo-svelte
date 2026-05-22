<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
  import { Link } from "kumo-svelte/components/link";
</script>

<div class="flex items-center gap-2">
  <CheckCircleIcon class="size-4 text-kumo-success" weight="fill" />
  <Link href="/">my-first-worker</Link>
  <span>created!</span>
</div>
