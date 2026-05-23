<script lang="ts">
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Table from "kumo-svelte/components/table";

  const emailData = [
    { id: "1", subject: "Kumo v1.0.0 released", from: "Visal In", date: "5 seconds ago" },
    { id: "2", subject: "New Job Offer", from: "Cloudflare", date: "10 minutes ago" },
    {
      id: "3",
      subject: "Daily Email Digest",
      from: "Cloudflare",
      date: "1 hour ago",
      tags: ["promotion"],
    },
    { id: "4", subject: "GitLab - New Comment", from: "Rob Knecht", date: "1 day ago" },
    { id: "5", subject: "Out of Office", from: "Johnnie Lappen", date: "3 days ago" },
  ];

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

<LayerCard.Root class="p-0">
  <Table.Root>
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
  </Table.Root>
</LayerCard.Root>
