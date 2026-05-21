<script lang="ts">
  import { Link } from "kumo-svelte";
</script>

<div class="flex flex-col gap-2 text-sm">
  <Link href="#">Default link</Link>
  <Link href="#" variant="current">Current color link</Link>
  <Link href="#" variant="plain">Plain link</Link>
</div>
