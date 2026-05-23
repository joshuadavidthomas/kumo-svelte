<script lang="ts">
  import { Badge } from "kumo-svelte/components/badge";
  import { Input } from "kumo-svelte/components/input";
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Tabs from "kumo-svelte/components/tabs";
  const origins = [
    { origin: "challenges.cloudflare.com", s2xx: 1, s4xx: 0, duration: "95.4ms" },
    { origin: "Unknown", s2xx: 19, s4xx: 7, duration: "463.7ms" },
    { origin: "api.example.com", s2xx: 42, s4xx: 3, duration: "128.1ms" },
  ];

  type StatusFilter = "all" | "2xx" | "3xx" | "4xx" | "5xx";

  let filter = $state<StatusFilter>("all");
  let search = $state("");

  let filtered = $derived(
    origins.filter((origin) => {
      if (filter === "2xx" && origin.s2xx === 0) return false;
      if (filter === "4xx" && origin.s4xx === 0) return false;
      if (search && !origin.origin.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }),
  );
</script>

<LayerCard.Root layered class="w-full max-w-[540px]">
  <LayerCard.Secondary>Subrequests</LayerCard.Secondary>

  <LayerCard.Primary>
    <div class="mb-2 flex items-center gap-3">
      <Input
        size="sm"
        placeholder="Filter origins…"
        aria-label="Filter origins"
        bind:value={search}
        class="min-w-0 flex-1"
      />
      <Tabs.Root
        variant="segmented"
        size="sm"
        class="shrink-0"
        value={filter}
        onValueChange={(value) => {
          filter = value as StatusFilter;
        }}
      >
        <Tabs.List>
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="2xx">2xx</Tabs.Trigger>
          <Tabs.Trigger value="3xx">3xx</Tabs.Trigger>
          <Tabs.Trigger value="4xx">4xx</Tabs.Trigger>
          <Tabs.Trigger value="5xx">5xx</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>

    <div class="-mx-1 text-sm">
      <div class="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-kumo-fill px-1 pb-2 text-xs font-medium text-kumo-subtle">
        <span>Origin</span>
        <span class="w-28 text-right">Requests</span>
        <span class="w-20 text-right">Duration</span>
      </div>

      {#each filtered as row, index (row.origin)}
        <div
          class="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-1 py-2.5"
          class:border-b={index < filtered.length - 1}
          class:border-kumo-hairline={index < filtered.length - 1}
        >
          <span class="truncate font-medium text-kumo-default">{row.origin}</span>
          <div class="flex w-28 items-center justify-end gap-1.5">
            {#if row.s2xx > 0}<Badge variant="success">2xx {row.s2xx}</Badge>{/if}
            {#if row.s4xx > 0}<Badge variant="error">4xx {row.s4xx}</Badge>{/if}
          </div>
          <span class="w-20 text-right text-kumo-subtle">{row.duration}</span>
        </div>
      {/each}
    </div>

    <div class="-mx-1 border-t border-kumo-fill pt-2 text-xs text-kumo-subtle">
      Showing {filtered.length} of {origins.length}
    </div>
  </LayerCard.Primary>
</LayerCard.Root>
