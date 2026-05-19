<script lang="ts">
  import {
    Badge,
    Button,
    LayerCard,
    Table,
    TableBody,
    TableCell,
    TableCheckCell,
    TableCheckHead,
    TableHead,
    TableHeader,
    TableRow,
  } from "kumo-svelte";
  import EnvelopeSimpleIcon from "phosphor-svelte/lib/EnvelopeSimpleIcon";
  import { emailData } from "./table-data";

  let selectedIds = $state(new Set<string>(["2"]));

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }
</script>

<LayerCard class="w-full max-w-2xl overflow-x-auto p-0">
  <Table layout="fixed">
    <colgroup>
      <col class="w-10" />
      <col />
      <col class="w-[140px]" />
      <col class="w-[140px]" />
      <col class="w-[90px]" />
    </colgroup>
    <TableHeader variant="compact">
      <TableRow>
        <TableCheckHead checked={selectedIds.size === emailData.length} indeterminate={selectedIds.size > 0 && selectedIds.size < emailData.length} />
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
        <TableHead sticky="right"><span class="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each emailData as row (row.id)}
        <TableRow variant={selectedIds.has(row.id) ? "selected" : "default"}>
          <TableCheckCell checked={selectedIds.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
          <TableCell class="truncate">
            <span class="inline-flex items-center gap-2">
              <EnvelopeSimpleIcon class="size-4 text-kumo-subtle" />
              {row.subject}
              {#if row.tags}<Badge>{row.tags[0]}</Badge>{/if}
            </span>
          </TableCell>
          <TableCell class="truncate">{row.from}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell sticky="right" class="text-right">
            <Button variant="ghost" size="sm">View</Button>
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
