<script lang="ts">
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
  import { Button, Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle } from "kumo-svelte";

  const rows = [
    { id: "1", name: "api-gateway", status: "Active" },
    { id: "2", name: "auth-service", status: "Active" },
    { id: "3", name: "worker-prod", status: "Paused" },
  ];

  let selectedRow = $state<string | undefined>();
  let anchor = $state<{ getBoundingClientRect: () => DOMRect } | undefined>();
  let open = $derived(Boolean(selectedRow));

  function handleEdit(event: MouseEvent, id: string) {
    const row = (event.currentTarget as HTMLElement).closest("tr");
    anchor = {
      getBoundingClientRect: () => (row ?? (event.currentTarget as HTMLElement)).getBoundingClientRect(),
    };
    selectedRow = id;
  }
</script>

<div class="w-full">
  <div class="overflow-hidden rounded-lg border border-kumo-hairline">
    <table class="w-full text-sm">
      <thead class="bg-kumo-elevated">
        <tr>
          <th class="px-4 py-2 text-left font-medium">Name</th>
          <th class="px-4 py-2 text-left font-medium">Status</th>
          <th class="w-12 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-kumo-hairline">
        {#each rows as row (row.id)}
          <tr class={selectedRow === row.id ? "bg-kumo-recessed" : "bg-kumo-base"}>
            <td class="px-4 py-2 font-mono">{row.name}</td>
            <td class="px-4 py-2 text-kumo-subtle">{row.status}</td>
            <td class="px-4 py-2">
              <Button
                size="xs"
                variant="ghost"
                shape="square"
                icon={DotsThreeIcon}
                aria-label={`Actions for ${row.name}`}
                onclick={(event) => handleEdit(event, row.id)}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <Popover {open} onOpenChange={(nextOpen) => !nextOpen && (selectedRow = undefined)}>
    <PopoverContent side="left" {anchor}>
      <PopoverTitle>Edit {rows.find((row) => row.id === selectedRow)?.name}</PopoverTitle>
      <PopoverDescription>The popover anchors to the selected row, not the icon button.</PopoverDescription>
      <div class="mt-3">
        <PopoverClose>
          {#snippet child({ props })}
            <Button {...props} size="sm" variant="secondary">Close</Button>
          {/snippet}
        </PopoverClose>
      </div>
    </PopoverContent>
  </Popover>
</div>
