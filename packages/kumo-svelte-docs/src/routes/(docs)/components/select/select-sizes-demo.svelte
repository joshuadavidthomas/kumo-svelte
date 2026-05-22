<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  const sizes = ["xs", "sm", "base", "lg"] as const;
</script>

<div class="grid gap-4">
  {#each sizes as size}
    <div class="flex items-center gap-3">
      <span class="w-10 text-sm text-kumo-subtle">{size}</span>
      <Select.Root
        aria-label={`Select size ${size}`}
        {size}
        class="w-[200px]"
        placeholder="Choose..."
        items={{ a: "Option A", b: "Option B" }}
      />
    </div>
  {/each}
</div>
