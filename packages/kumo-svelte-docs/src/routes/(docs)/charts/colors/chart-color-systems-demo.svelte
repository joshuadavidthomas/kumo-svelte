<script lang="ts">
  const systems = [
    { title: "Semantic", text: "Status, severity, and health data." },
    { title: "Categorical", text: "Nominal series with no inherent order." },
    { title: "Sequential", text: "Density or magnitude encoded by intensity." },
  ];
</script>

<div class="grid gap-4 md:grid-cols-3">
  {#each systems as system}
    <div class="rounded-lg border border-kumo-hairline bg-kumo-base p-4">
      <h3 class="mb-1 text-sm font-semibold">{system.title}</h3>
      <p class="m-0 text-sm text-kumo-subtle">{system.text}</p>
    </div>
  {/each}
</div>
