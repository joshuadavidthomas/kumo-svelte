<script lang="ts">
  import { Grid, GridItem, Text } from "kumo-svelte";

  const variants = [
    { name: "2up", count: 2 },
    { name: "3up", count: 3 },
    { name: "4up", count: 4 },
  ] as const;
</script>

<div class="flex flex-col gap-8">
  {#each variants as variant}
    <div>
      <p class="mb-2 text-kumo-subtle">variant="{variant.name}"</p>
      <Grid variant={variant.name} gap="sm">
        {#each Array.from({ length: variant.count }, (_, index) => index + 1) as item}
          <GridItem>
            <div class="rounded-lg border border-kumo-hairline bg-kumo-elevated p-4 text-center">
              <Text>{item}</Text>
            </div>
          </GridItem>
        {/each}
      </Grid>
    </div>
  {/each}
</div>
