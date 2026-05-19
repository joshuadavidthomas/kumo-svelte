<script lang="ts">
  import { Grid, GridItem, Text } from "kumo-svelte";
</script>

<Grid variant="2up" gap="base">
  <GridItem>
    <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
      <Text bold>Item 1</Text>
      <div class="mt-1"><Text variant="secondary">First grid item</Text></div>
    </div>
  </GridItem>
  <GridItem>
    <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
      <Text bold>Item 2</Text>
      <div class="mt-1"><Text variant="secondary">Second grid item</Text></div>
    </div>
  </GridItem>
</Grid>
