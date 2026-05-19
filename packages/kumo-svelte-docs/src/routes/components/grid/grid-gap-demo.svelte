<script lang="ts">
  import { Grid, GridItem, Text } from "kumo-svelte";

  const gaps = ["none", "sm", "base", "lg"] as const;
</script>

<div class="flex flex-col gap-8">
  {#each gaps as gap}
    <div>
      <p class="mb-2 text-kumo-subtle">gap="{gap}"</p>
      <Grid variant="side-by-side" {gap}>
        <GridItem>
          <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4 text-center"><Text>1</Text></div>
        </GridItem>
        <GridItem>
          <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4 text-center"><Text>2</Text></div>
        </GridItem>
      </Grid>
    </div>
  {/each}
</div>
