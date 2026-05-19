<script lang="ts">
  import { Grid, GridItem, Text } from "kumo-svelte";
</script>

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-kumo-subtle">variant="2-1" (66% / 33%)</p>
    <Grid variant="2-1" gap="sm">
      <GridItem>
        <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
          <Text bold>Main Content</Text>
          <div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div>
        </div>
      </GridItem>
      <GridItem>
        <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
          <Text bold>Sidebar</Text>
          <div class="mt-1"><Text variant="secondary">One-third width</Text></div>
        </div>
      </GridItem>
    </Grid>
  </div>
  <div>
    <p class="mb-2 text-kumo-subtle">variant="1-2" (33% / 66%)</p>
    <Grid variant="1-2" gap="sm">
      <GridItem>
        <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
          <Text bold>Sidebar</Text>
          <div class="mt-1"><Text variant="secondary">One-third width</Text></div>
        </div>
      </GridItem>
      <GridItem>
        <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4">
          <Text bold>Main Content</Text>
          <div class="mt-1"><Text variant="secondary">Two-thirds width</Text></div>
        </div>
      </GridItem>
    </Grid>
  </div>
</div>
