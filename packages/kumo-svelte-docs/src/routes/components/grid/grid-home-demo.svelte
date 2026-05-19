<script lang="ts">
  import { Grid, GridItem } from "kumo-svelte";
</script>

<Grid variant="side-by-side" gap="sm" class="w-[140px]">
  {#each [1, 2, 3, 4] as number}
    <GridItem class="rounded bg-kumo-control p-3 text-center text-xs">{number}</GridItem>
  {/each}
</Grid>
