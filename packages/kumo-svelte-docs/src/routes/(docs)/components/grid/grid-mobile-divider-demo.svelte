<script lang="ts">
  import { Grid, GridItem, Surface, Text } from "kumo-svelte";
</script>

<Grid variant="4up" gap="base" mobileDivider>
  {#each [1, 2, 3, 4] as item}
    <GridItem>
      <Surface class="rounded-lg p-4">
        <Text bold>Item {item}</Text>
        <div class="mt-1"><Text variant="secondary">Has divider on mobile</Text></div>
      </Surface>
    </GridItem>
  {/each}
</Grid>
