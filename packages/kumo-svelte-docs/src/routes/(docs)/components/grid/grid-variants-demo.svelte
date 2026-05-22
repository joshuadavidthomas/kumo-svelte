<script lang="ts">
  import { Grid, GridItem } from "kumo-svelte/components/grid";
  import { Surface } from "kumo-svelte/components/surface";
  import { Text } from "kumo-svelte/components/text";
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
            <Surface class="rounded-lg p-4 text-center">
              <Text>{item}</Text>
            </Surface>
          </GridItem>
        {/each}
      </Grid>
    </div>
  {/each}
</div>
