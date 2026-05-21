<script lang="ts">
  import { Grid, GridItem, Surface, Text } from "kumo-svelte";

  const gaps = ["none", "sm", "base", "lg"] as const;
</script>

<div class="flex flex-col gap-8">
  {#each gaps as gap}
    <div>
      <p class="mb-2 text-kumo-subtle">gap="{gap}"</p>
      <Grid variant="side-by-side" {gap}>
        <GridItem>
          <Surface class="rounded-lg p-4 text-center"><Text>1</Text></Surface>
        </GridItem>
        <GridItem>
          <Surface class="rounded-lg p-4 text-center"><Text>2</Text></Surface>
        </GridItem>
      </Grid>
    </div>
  {/each}
</div>
