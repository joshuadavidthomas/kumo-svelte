<script lang="ts">
  import {
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
  import { emailData } from "./table-data";

  const rows = emailData.slice(0, 3);
  let selectedIds = $state(new Set<string>());

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }

  function toggleAll() {
    selectedIds = selectedIds.size === rows.length ? new Set() : new Set(rows.map((row) => row.id));
  }
</script>

<LayerCard class="p-0">
  <Table>
    <TableHeader>
      <TableRow>
        <TableCheckHead
          checked={selectedIds.size === rows.length}
          indeterminate={selectedIds.size > 0 && selectedIds.size < rows.length}
          onCheckedChange={toggleAll}
          label="Select all rows"
        />
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each rows as row (row.id)}
        <TableRow>
          <TableCheckCell checked={selectedIds.has(row.id)} onCheckedChange={() => toggleRow(row.id)} label={`Select ${row.subject}`} />
          <TableCell>{row.subject}</TableCell>
          <TableCell>{row.from}</TableCell>
          <TableCell>{row.date}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
