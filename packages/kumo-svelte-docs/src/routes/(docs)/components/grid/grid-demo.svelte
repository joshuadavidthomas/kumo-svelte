<script lang="ts">
  import { Grid, GridItem, Surface, Text } from "kumo-svelte";
</script>

<Grid variant="2up" gap="base">
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 1</Text>
      <div class="mt-1"><Text variant="secondary">First grid item</Text></div>
    </Surface>
  </GridItem>
  <GridItem>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 2</Text>
      <div class="mt-1"><Text variant="secondary">Second grid item</Text></div>
    </Surface>
  </GridItem>
</Grid>
