<script lang="ts">
  import { Grid, GridItem, Text } from "kumo-svelte";
</script>

<Grid variant="4up" gap="base" mobileDivider>
  {#each [1, 2, 3, 4] as item}
    <GridItem>
      <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
        <Text bold>Item {item}</Text>
        <div class="mt-1"><Text variant="secondary">Has divider on mobile</Text></div>
      </div>
    </GridItem>
  {/each}
</Grid>
