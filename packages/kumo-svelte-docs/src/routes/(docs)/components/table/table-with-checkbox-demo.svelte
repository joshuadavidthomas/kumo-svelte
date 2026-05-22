<script lang="ts">
  import { LayerCard, Table } from "kumo-svelte";
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
    <Table.Header>
      <Table.Row>
        <Table.CheckHead
          checked={selectedIds.size === rows.length}
          indeterminate={selectedIds.size > 0 && selectedIds.size < rows.length}
          onCheckedChange={toggleAll}
          label="Select all rows"
        />
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each rows as row (row.id)}
        <Table.Row>
          <Table.CheckCell checked={selectedIds.has(row.id)} onCheckedChange={() => toggleRow(row.id)} label={`Select ${row.subject}`} />
          <Table.Cell>{row.subject}</Table.Cell>
          <Table.Cell>{row.from}</Table.Cell>
          <Table.Cell>{row.date}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table>
</LayerCard>
